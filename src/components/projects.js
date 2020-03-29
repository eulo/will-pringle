import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'

import WorkBlock from '../components/work-block'

class Projects extends Component {

  static defaultProps = {
    title: 'Latest Work',
    length: -1,
  }

  render() {
    const { title, length, data } = this.props

    return (
      <div className='projects'>
        <h2>{ title }</h2>
        <div className='projects__blocks'>
          { data.work.edges.slice(0, length).map((el, i) => <WorkBlock key={i} index={i} work={el.node} />) }
        </div>
      </div>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        work: allWordpressWpWork(sort: {fields: [date], order: DESC}) {
          edges {
            node {
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
                  alt_text
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 350) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Projects data={data} {...props} />}
  />
)
