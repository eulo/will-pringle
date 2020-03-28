import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../components/Header'
import Footer from '../components/Footer'

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
    `}
    render={data => {
      return (
        <>
          <Header />
          <main>{ children }</main>
          <Footer />
        </>
      )
    }}
  />
)

export default Layout
