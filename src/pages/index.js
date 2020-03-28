import React from 'react'

import SEO from '../components/seo'
import Projects from '../components/projects'

const IndexPage = () => (
  <>
    <SEO title='Home' />
    <Projects length={12} />
    <h2>About Me</h2>
    <p>Hey! I'm Will, a Full Stack Web Developer. I’ve been working as a freelance Web Developer in Melbourne for over 10 years. Specialising in  React.js, custom built WordPress backends and online shops in WooCommerce & Shopify.</p>
    <p>Email me at <a href='mailto:hello@codedrips.com'>hello@codedrips.com</a></p>
  </>
)

export default IndexPage
