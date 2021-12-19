import { PostListItemType } from 'components/Main/PostItem.types'
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'

export type useInfiniteScrollType = {
  containerRef: MutableRefObject<HTMLDivElement | null>
  postList: PostListItemType[]
}
const ITEMCOUNTS_PER_PAGE = 10

const useInfiniteScroll = function (
  selectedCategory: string,
  posts: PostListItemType[],
): useInfiniteScrollType {
  const containerRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(1)
  const filteredPosts = useMemo<PostListItemType[]>(
    () =>
      posts.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }) =>
          selectedCategory === 'All' || categories.includes(selectedCategory),
      ),
    [selectedCategory],
  )
  const observer: IntersectionObserver = new IntersectionObserver(
    (entries, observer1) => {
      if (!entries[0].isIntersecting) return
      setCount(prev => prev + 1) //교차하면 count 증가
      observer1.disconnect()
    },
  )
  useEffect(() => setCount(1), [selectedCategory])
  useEffect(() => {
    if (
      ITEMCOUNTS_PER_PAGE * count > filteredPosts.length ||
      containerRef.current === null ||
      containerRef.current?.children.length === 0
    ) {
      return
    }
    const {
      current: { children },
    } = containerRef
    observer.observe(children[children.length - 1]) //가장 마지막 postitem을 관측
  }, [count, selectedCategory])
  return {
    containerRef,
    postList: filteredPosts.slice(0, count * ITEMCOUNTS_PER_PAGE),
  }
}
export default useInfiniteScroll
