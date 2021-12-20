import React, { createRef, FunctionComponent, useEffect } from 'react'
import styled from '@emotion/styled'

const src = 'https://utteranc.es/client.js'
const repo = 'inust33/inust33.github.io'

type UtterancesAttributesType = {
  src: string
  repo: string
  'issue-term': string
  label: string
  theme: string
  crossorigin: string
  async: string
}
const UtterancesWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`
const CommentWidget: FunctionComponent = function () {
  const element = createRef<HTMLDivElement>() //컴포넌트 내에서 리렌더링 시키지 않기 위해서
  useEffect(() => {
    if (element.current === null) return
    const utterances: HTMLScriptElement = document.createElement('script')
    const attrs: UtterancesAttributesType = {
      src,
      repo,
      'issue-term': 'title',
      label: 'Comment',
      theme: 'github-light',
      crossorigin: 'anonymous',
      async: 'true',
    }
    Object.entries(attrs).forEach(([key, val]) => {
      utterances.setAttribute(key, val)
    })
    element.current.appendChild(utterances)
  }, [])
  return <UtterancesWrapper ref={element} />
}
export default CommentWidget
