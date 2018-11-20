import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

// import Bio from '../components/Bio'
import { Section, Content, Title, Image } from 'bloomer';
import Layout from '../layouts';

// import { rhythm, scale } from '../utils/typography'

class PageTemplate extends React.PureComponent {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const {
      location,
      data: { markdownRemark: page },
    } = this.props;
    const description = page.excerpt;
    const featuredImage = get(page, 'frontmatter.featuredImage.childImageSharp.fluid.src', null);

    return (
      <Layout
        location={location}
        title={`${page.frontmatter.title} | ${siteTitle}`}
        style={
          featuredImage
            ? {
                backgroundImage: `url(${featuredImage})`,
              }
            : null
        }
      >
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: description }]}
          title={`${page.frontmatter.title} | ${siteTitle}`}
        />
        <Section className="section--post">

          <Content>
            <div dangerouslySetInnerHTML={{ __html: page.html }} />
          </Content>
          <hr />
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
            }}
          >
            {page.frontmatter.date}
          </div>
        </Section>
      </Layout>
    );
  }
}

export default PageTemplate;

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`;
