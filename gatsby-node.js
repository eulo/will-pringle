const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const template = path.resolve(`./src/templates/project.js`)

  const work = await graphql(`
    {
      allWordpressWpWork {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  work.data.allWordpressWpWork.edges.forEach(edge => {
    createPage({
      path: `/project/${edge.node.slug}`,
      component: template,
      context: { id: edge.node.id },
    })
  })
}
