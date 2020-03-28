import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../components/header'
import Footer from '../components/footer'
import WebGLCanvas from '../components/webgl-canvas'

import '../assets/scss/main.scss'

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      fragment original on wordpress__wp_media {
        alt_text
        localFile {
          childImageSharp {
            original {
              src
              width
              height
            }
          }
        }
      }
      {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `}
    render={data => {
      return (
        <>
          <div className='wrap'>
            <Header />
            <main>{ children }</main>
          </div>
          <Footer />
          <WebGLCanvas />
        </>
      )
    }}
  />
)

export default Layout
