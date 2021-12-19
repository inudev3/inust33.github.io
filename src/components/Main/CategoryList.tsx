import React, { FunctionComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

export type CategoryListProp = {
  selectedCategory: string
  categoryList: {[key:string]:number}
}
type CategoryItemProps = {
  active: boolean
}
type GatsbyLinkProps = {
  children: ReactNode
  className?: string
  to: string
} & CategoryItemProps

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 768px;
  margin: 100px auto 0;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 50px;
    padding: 0 20px;
  }
`
//emotion에서는 styled매개변수로 함수를 넣어도
const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
  <Link {...props} />
))<CategoryItemProps>`
  margin-right: 20px;
  padding: 5px 0;
  font-size: 18px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? '800' : '400')};

  &:last-of-type {
    margin-right: 0;
  }
  @media (max-width: 768px) {
    font-size: 15px;
  }
`

const CategoryList: FunctionComponent<CategoryListProp> = function ({
  selectedCategory,
  categoryList,
}) {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([cat, count]) => (
        <CategoryItem
          to={`/?category=${cat}`}
          active={cat === selectedCategory}
          key={cat}
        >
          {' '}
          #{cat} ({count})
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  )
}
export default CategoryList
