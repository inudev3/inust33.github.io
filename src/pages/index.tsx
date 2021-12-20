import React, { FunctionComponent, useMemo } from 'react'

import Introduction from 'components/Main/introduction'

import CategoryList, { CategoryListProp } from 'components/Main/CategoryList'
import PostList from 'components/Main/PostList'
import { graphql } from 'gatsby'
import { PostListItemType } from 'components/Main/PostItem.types'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import Template from 'components/Common/Template'

type IndexProp = {
  location: { search: string }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: { gatsbyImageData: IGatsbyImageData }
      publicURL: string
    }
  }
}

const IndexPage: FunctionComponent<IndexProp> = function ({
  location: { search },
  data,
}) {
  const {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
      publicURL,
    },
  } = data
  const parsed: URLSearchParams = new URLSearchParams(search)
  const categoryParam = parsed.get('category')
  const selectedCategory: string =
    typeof categoryParam !== 'string' || !categoryParam ? 'All' : categoryParam

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (list: CategoryListProp['categoryList'], edge) => {
          const {
            node: {
              frontmatter: { categories },
            },
          } = edge
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1
            else list[category]++
          })
          list['All']++
          return list
        },
        { All: 0 },
      ),
    [edges],
  )

  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={publicURL}
    >
      <Introduction profileImage={gatsbyImageData} />
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList posts={edges} selectedCategory={selectedCategory} />
    </Template>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120)
      }
      publicURL
    }
  }
`
