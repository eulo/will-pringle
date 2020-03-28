import React from 'react'

import SEO from '../components/seo'
import Projects from '../components/projects'
import About from '../components/about'

const IndexPage = () => (
  <>
    <SEO title='Home' />
    <Projects length={12} />
    <About />
  </>
)

export default IndexPage
