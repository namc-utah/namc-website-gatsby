import React from 'react'
import { graphql } from 'gatsby'
import { html2material } from '../lib/rehype'
import Page from '../components/Page'
import Home from '../components/Home'
import { Typography } from '@mui/material'

export interface TemplateProps {
    data: any
}

const Template: React.FC<TemplateProps> = ({
    data // this prop will be injected by the GraphQL query below.
}: TemplateProps) => {
    const { page } = data // data.markdownRemark holds your post data
    const { fields, html, frontmatter } = page
    const content = html2material(html)

    if (fields.slug === '/index') return <Home>{content}</Home>
    return (
        <Page>
            <>
                <Typography variant="h3">{frontmatter.title}</Typography>
                {content}
            </>
        </Page>
    )
}

export const pageQuery = graphql`
    query ($slug: String!) {
        page: markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            fields {
                slug
            }
            frontmatter {
                title
            }
        }
    }
`

export default Template
