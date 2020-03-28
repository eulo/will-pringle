import React, { Component } from 'react'
import Link from '../utils/link'

class WorkBlock extends Component {
  renderImage(image) {
    if (image === null || !image.localFile) return
    return <img className='work__image' src={image.localFile.childImageSharp.original.src} alt={image.alt_text} />
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
