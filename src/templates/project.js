import React, { Component } from 'react'
import { graphql } from 'gatsby'

import Link from '../utils/link'
import SEO from '../components/seo'

class ProjectTemplate extends Component {

  renderImage(image, i) {
    if (image === null || !image.localFile) return
    return <img key={i} src={image.localFile.childImageSharp.original.src} alt={image.alt_text} />
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
        rollover_image {
          ...original
        }
        gallery {
          ...original
        }
      }
    }
  }
`
