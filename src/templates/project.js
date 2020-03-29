import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'


import Link from '../utils/link'
import SEO from '../components/seo'

class ProjectTemplate extends Component {

  renderImage(image, i) {
    if (image === null || !image.localFile) return
    return <Img key={i} fluid={image.localFile.childImageSharp.fluid} alt={image.alt_text} />
  }

  render() {

    let { work } = this.props.data

    return (
      <>
        <SEO title={`${work.title} - Project`} />
        <div className='project'>
          <div className='project__content'>
            <div dangerouslySetInnerHTML={{ __html: work.content }} />
            <Link to={ work.acf.live_url }>Visit Website</Link>
          </div>
          <div className='project__gallery'>
            { work.acf.gallery && work.acf.gallery.map((item, i) => this.renderImage(item, i)) }
          </div>
        </div>
      </>
    )
  }
}

export default ProjectTemplate

export const query = graphql`
  query ($id: String!) {
	  work: wordpressWpWork(id: {eq: $id}) {
      slug
      title
      content
      acf {
        colour
        text_colour
        year
        role
        agency
        live_url
        gallery {
          alt_text
          localFile {
            childImageSharp {
              fluid(maxWidth: 740) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
