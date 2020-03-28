import React, { Component } from 'react'

class WebGLCanvas extends Component {

  componentDidMount() {
    let gl = require('../utils/webgl-particals')
    gl.track_init()
    gl.loadScene()
  }
  render() {
    return (
      <>
        <canvas id="webGLCanvas"></canvas>
        <div dangerouslySetInnerHTML={{__html : `
          <script id="shader-vs" type="x-shader/x-vertex">
            attribute vec3 vertexPosition;

            uniform mat4 modelViewMatrix;
            uniform mat4 perspectiveMatrix;

            void main(void) {
              gl_Position = perspectiveMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);
            }
          </script>
          <script id="shader-fs" type="x-shader/x-fragment">
            #ifdef GL_ES
              precision highp float;
            #endif
            void main(void) {
              gl_FragColor = vec4(0.36, 0.11, 0.88, 0.8);
            }
          </script>`}} />
      </>
    )
  }
}

export default WebGLCanvas
