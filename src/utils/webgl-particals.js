/*
Modification of http://minimal.be/lab/fluGL/ to get rid of crappy side particals and create smoother experience
TODO: Get colors changing (note:current color change implementation causing huge FPS issue)

 */


function drawScene() {
	var i, n = vertices.length, p, bp;
	for( i = 0; i < numLines; i+=2 )
	{
		bp = i*3;
		// copy old positions
		vertices[bp] = vertices[bp+3];
		vertices[bp+1] = vertices[bp+4];

		// inertia
		velocities[bp] *= velocities[bp+2];
		velocities[bp+1] *= velocities[bp+2];

		// horizontal
		p = vertices[bp+3];
		p += velocities[bp];
		if ( p < -ratio ) {
			p = -ratio;
			velocities[bp] = Math.abs(velocities[bp]);
		} else if ( p > ratio ) {
			p = ratio;
			velocities[bp] = -Math.abs(velocities[bp]);
		}
		vertices[bp+3] = p;

		// vertical
		p = vertices[bp+4];
		p += velocities[bp+1];
		if ( p < -1 ) {
			p = -1;
			velocities[bp+1] = Math.abs(velocities[bp+1]);
		} else if ( p > 1 ) {
			p = 1;
			velocities[bp+1] = -Math.abs(velocities[bp+1]);

		}
		vertices[bp+4] = p;

		if ( touched )
		{
			var dx = touchX - vertices[bp],
					dy = touchY - vertices[bp+1],
					d = Math.sqrt(dx * dx + dy * dy);
					if ( d < 2 )
					{
						if ( d < .03 )
						{
							/*
							vertices[bp+3] = (Math.random() * 2 - 1)*ratio;
							vertices[bp+4] = Math.random() * 2 - 1;
							velocities[bp] = 0;
							velocities[bp+1] = 0;
							*/
						} else {
							dx /= d;
							dy /= d;
							d = ( 2 - d ) / 2;
							d *= d;
							velocities[bp] += dx * d * .01;
							velocities[bp+1] += dy * d * .01;
						}
					}
		}
	}
	gl.lineWidth(1);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	//gl.drawArrays( gl.LINES_STRIP, 0, numLines );
	gl.drawArrays( gl.LINES, 0, numLines );
	//gl.drawArrays( gl.QUAD_STRIP, 0, numLines );

	gl.flush();
}

if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( callback,  element ) {

			window.setTimeout( callback, 1000 / 60 );

		};

	} )();

}

//document.addEventListener( "load", track_init, false );


var touched = false,
		touchX,
		touchY,
		touchID,
		tw, th, tratio;

function track_init( e ) {
		// set-up touch interaction
		document.addEventListener( 'touchstart', track_touch_start, false );
		document.addEventListener( 'touchmove', track_touch_move, false );
		document.addEventListener( 'touchend', track_touch_end, false );
		// set-up mouse interaction
		document.addEventListener( 'mousedown', track_mouse_down, false );
		document.addEventListener( 'mousemove', track_mouse_move, false );
		document.addEventListener( 'mouseup', track_mouse_up, false );

		tw = window.innerWidth/2;
		th = window.innerHeight/2;
		tratio = tw / th;
//		tw /= ratio;
/*
		cw /= 2;
		ch /= 2;
*/
}


function track_touch_start(event)
{
	if ( !touched )
	{
		var t = event.changedTouches[0];
		touchID = t.identifier;
		track_start( t.pageX, t.pageY );
	}
	event.preventDefault();
	return true;
}

function track_touch_move(event)
{
	if ( touched )
	{
		var ts = event.changedTouches,
				n = ts.length, t;
		while( n-- )
		{
			t = ts[n];
			if ( t.identifier == touchID )
			{
				track_move( t.pageX, t.pageY );
				break;
			}
		}
	}
	event.preventDefault();
	return true;
}

function track_touch_end(event)
{
	if ( touched )
	{
		var ts = event.changedTouches,
				n = ts.length, t;
		while( n-- )
		{
			t = ts[n];
			if ( t.identifier == touchID )
			{
				track_end();
				break;
			}
		}
	}
	event.preventDefault();
	return true;
}


function track_mouse_down( event )
{
	if ( !touched )
	{
		track_start( event.screenX, event.screenY );
	}

	event.preventDefault();
	return true;
}

function track_mouse_move(event)
{
	if ( touched )
	{
		track_move( event.screenX, event.screenY );
	}

	event.preventDefault();
	return true;
}

function track_mouse_up( event )
{
	if ( touched )
	{
		track_end();
	}

	event.preventDefault();
	return true;
}


function track_start( x, y )
{
	touched = true;
	track_move( x, y );
}

function track_move( x, y )
{
	touchX = (x / tw - 1)*tratio;
	touchY = -(y / th - 1);
	//console.log( touchX + " -- " + touchY );
}

function track_end()
{
	touched = false;
}

/*

var shader_fs = '    #ifdef GL_ES
                  precision highp float;
                  #endif
            void main(void) {
             gl_FragColor = vec4(0.3, 0.81, 0.28, 0.5);
            }';

var shader_vs = 'attribute vec3 vertexPosition;

            uniform mat4 modelViewMatrix;
            uniform mat4 perspectiveMatrix;

            void main(void) {
                gl_Position = perspectiveMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);
            }';

*/

//window.onload = loadScene;

var canvas, gl,
		ratio,
		vertices,
		velocities,
		cw,
		ch,
		colorLoc,
		numLines = 30000;


function loadScene()
{
	canvas = document.getElementById("webGLCanvas");
	gl = canvas.getContext("experimental-webgl");
	if(!gl)
	{
		alert("There's no WebGL context available.");
		return;
	}

	cw = window.innerWidth;
	ch = window.innerHeight;
	canvas.width = cw;
	canvas.height = ch;
	gl.viewport(0, 0, canvas.width, canvas.height);


	var vertexShaderScript = document.getElementById("shader-vs");
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, vertexShaderScript.text);
	gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		alert("Couldn't compile the vertex shader");
		gl.deleteShader(vertexShader);
		return;
	}

	var fragmentShaderScript = document.getElementById("shader-fs");
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderScript.text);
	gl.compileShader(fragmentShader);
	if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		alert("Couldn't compile the fragment shader");
		gl.deleteShader(fragmentShader);
		return;
	}

	gl.program = gl.createProgram();
	gl.attachShader(gl.program, vertexShader);
	gl.attachShader(gl.program, fragmentShader);
	gl.linkProgram(gl.program);
	if (!gl.getProgramParameter(gl.program, gl.LINK_STATUS)) {
		alert("Unable to initialise shaders");
		gl.deleteProgram(gl.program);
		gl.deleteProgram(vertexShader);
		gl.deleteProgram(fragmentShader);
		return;
	}

	gl.useProgram(gl.program);
	var vertexPosition = gl.getAttribLocation(gl.program, "vertexPosition");
	gl.enableVertexAttribArray(vertexPosition);
	gl.clearColor(0.0, 0.0, 0.0, 0.0);
	gl.clearDepth(0.8);
	gl.enable(gl.BLEND);
	gl.disable(gl.DEPTH_TEST);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	vertices = [];
	ratio = cw / ch;
	velocities = [];
	for ( var i=0; i<numLines; i++ )
	{
		vertices.push( 0, 0, 1.83 );//(Math.random() * 2 - 1)*ratio, Math.random() * 2 - 1, 1.83 );
		velocities.push( (Math.random() * 2 - 1)*(ch/cw), (Math.random() * 2 - 1)*.05, .93 + Math.random()*.02 );
	}
	vertices = new Float32Array( vertices );
	velocities = new Float32Array( velocities );

	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	var fieldOfView = 30.0;
	var aspectRatio = canvas.width / canvas.height;
	var nearPlane = 1.0;
	var farPlane = 10000.0;
	var top = nearPlane * Math.tan(fieldOfView * Math.PI / 360.0);
	var bottom = -top;
	var right = top * aspectRatio;
	var left = -right;

	var a = (right + left) / (right - left);
	var b = (top + bottom) / (top - bottom);
	var c = (farPlane + nearPlane) / (farPlane - nearPlane);
	var d = (2 * farPlane * nearPlane) / (farPlane - nearPlane);
	var x = (2 * nearPlane) / (right - left);
	var y = (2 * nearPlane) / (top - bottom);
	var perspectiveMatrix = [
		x, 0, a, 0,
		0, y, b, 0,
		0, 0, c, d,
		0, 0, -1, 0
	];

	var modelViewMatrix = [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	];
	var vertexPosAttribLocation = gl.getAttribLocation(gl.program, "vertexPosition");
	gl.vertexAttribPointer(vertexPosAttribLocation, 3.0, gl.FLOAT, false, 0, 0);
	var uModelViewMatrix = gl.getUniformLocation(gl.program, "modelViewMatrix");
	var uPerspectiveMatrix = gl.getUniformLocation(gl.program, "perspectiveMatrix");
	gl.uniformMatrix4fv(uModelViewMatrix, false, new Float32Array(perspectiveMatrix));
	gl.uniformMatrix4fv(uPerspectiveMatrix, false, new Float32Array(modelViewMatrix));

	animate();
}

function animate() {
	requestAnimationFrame( animate );
	drawScene();
}

export { track_init, loadScene }
