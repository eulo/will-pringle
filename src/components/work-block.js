import React, { Component } from 'react'
import Img from 'gatsby-image'
import Link from '../utils/link'

class WorkBlock extends Component {
  renderImage(image) {
    if (image === null || !image.localFile) return
    return (
      <div className='work__image'>
        <Img fluid={image.localFile.childImageSharp.fluid} alt={image.alt_text} />
      </div>
    )
  }

  render() {
    let { work } = this.props

    return (
      <Link className='work' style={{backgroundColor: work.acf.colour}} to={`/project/${work.slug}`}>
        <span className='work__title' style={{color: work.acf.text_colour}}>{ work.title }</span>
        <span className='work__year' style={{color: work.acf.text_colour}}>{ work.acf.year }</span>
        { this.renderImage(work.acf.rollover_image) }
      </Link>
    );
  }
}

export default WorkBlock
