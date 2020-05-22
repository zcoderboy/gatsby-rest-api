import React from 'react';
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

export const query = graphql`
  {
    allArticlesJson {
      edges {
        node {
          title
          date
          teaser
          image{
            childImageSharp{
              fluid{
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
const Index = ({data}) => {
    const edges = data.allArticlesJson.edges
    return (
      edges.map((edge) => {
        const article = edge.node
        return <>
          <Img
            fluid={article.image.childImageSharp.fluid}
          />
          <h1>{article.title}</h1>
        </>
      })
    )
}

export default Index