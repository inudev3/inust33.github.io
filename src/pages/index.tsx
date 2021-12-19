import React, { FunctionComponent, useMemo } from 'react'

import GlobalStyle from 'components/Common/GlobalStyle'
import styled from '@emotion/styled'
import Introduction from 'components/Main/introduction'
import Footer from 'components/Common/Footer'
import CategoryList, { CategoryListProp } from 'components/Main/CategoryList'
import PostList from 'components/Main/PostList'
import { graphql } from 'gatsby'
import { PostListItemType } from 'components/Main/PostItem.types'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import Template from 'components/Common/Template'
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
type IndexProp = {
  location: { search }
  data: {
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      childImageSharp: { gatsbyImageData: IGatsbyImageData }
    }
  }
}

const IndexPage: FunctionComponent<IndexProp> = function ({
  location: { search },
  data,
}) {
  const {
    allMarkdownRemark: { edges },
    file: {
      childImageSharp: { gatsbyImageData },
    },
  } = data
  const parsed: URLSearchParams = new URLSearchParams(location.search)
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
    <Template>
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
    }
  }
`
