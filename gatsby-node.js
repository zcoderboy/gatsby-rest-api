const http = require('axios')
const fs = require("fs")
const path = require('path')
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.onPreBootstrap = async () => {
  let response = await http.get("http://localhost:32867/api/new-articles?_format=json")
  fs.writeFile(path.join(__dirname,'/data/articles.json'),JSON.stringify(response.data,null,2), () => {
    console.log('Plugged Rest API data to Gatsby data layer')
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type ArticlesJson implements Node {
      image: File @link(from: "image___NODE")
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (
    node.internal.type === "ArticlesJson" &&
    node.imageUrl !== null
  ) {
    let fileNode = await createRemoteFileNode({
      url: node.imageUrl,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    })
    if (fileNode) {
      node.image___NODE = fileNode.id
    }
  }
}