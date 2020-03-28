import React from 'react'

import Link from '../utils/link'

const About = () => (
  <div className='about'>
    <h2>About Me</h2>
    <p>My name is Will Pringle and I am a freelance WordPress Developer, Front End Developer, and Back End Developer based in Fitzroy, Melbourne.</p>
    <p>I’ve been stuffing around in the world of web and mobile for over 10 years now building everything from native mobile applications to fully fledged e-commerce driven websites.</p>
    <p>I’m essentially the epitome of a computer nerd, I love Math and in particular functional programming.  My idea of a good time when it comes to my work is finding the most efficient and beautiful ways to expose data.</p>
    <p>I’m addicted to learning about new technologies and exploring new ways of doing things. I always try to find a way to bring something into a project that I haven’t used before.</p>
    <p>If I sound like someone you think you’d enjoy working with <Link to='mailto:hello@codedrips.com'>email me</Link></p>
    <h3><Link to='mailto:hello@codedrips.com'>hello@codedrips.com</Link></h3>

    <p>Some of my current development skills include:</p>
    <ul>
      <li>Shopify development, including Shopify Plus</li>
      <li>WooCommerce development</li>
      <li>Custom WordPress theme development (using WordPress best practices)</li>
      <li>Responsive web development</li>
      <li>Custom WordPress CMS functionality</li>
      <li>PHP, SASS, CSS3, jQuery, HTML5 and Git version control</li>
    </ul>
  </div>
)

export default About
