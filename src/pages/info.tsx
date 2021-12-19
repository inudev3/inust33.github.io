import React, {FunctionComponent} from 'react'
import {graphql} from 'gatsby'
import {css, Global} from "@emotion/react";
import styled from "@emotion/styled";

const TextStyle = css`
  font-size: 18px;
  font-weight: 700;
  color: gray;
`;
const Text1 = styled.div<{ disable: boolean }>`
  font-size: 20px;
  font-weight: 700;
  text-decoration: ${props => props.disable ? 'line-through' : 'none'};
`;

const GlobalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;;
    font-size: 20px;
  }
`

type InfoPageProps = {
    data: {
        site: {
            siteMetadata: {
                title: string
                description: string
                author: string
            }
        }
    }
}


const InfoPage: FunctionComponent<InfoPageProps> = function ({data:{site:{siteMetadata:{title,description,author}}}}) {
    return (
        <div>
            <Global styles={GlobalStyle}/>
            <div css={TextStyle}>{title}{author}</div>
            <Text1 disable={true}>{description}</Text1>
        </div>
    )
}

export default InfoPage

export const metadataQuery = graphql`
    {
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`