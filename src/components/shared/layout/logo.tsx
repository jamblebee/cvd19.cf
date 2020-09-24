import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Logo = () => {
  const data = useStaticQuery(graphql`
    query ImageSharp {
      placeholderImage: file(relativePath: { eq: "coronavirus.png" }) {
        childImageSharp {
          fluid(maxWidth: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Img
      style={{
        maxWidth: '3.3em',
        maxHeight: '3.3em',
        borderRadius: '3.3em',
        borderStyle: 'solid',
        borderWidth: '0.15rem',
      }}
      title="Corona"
      fluid={data.placeholderImage.childImageSharp.fluid}
    />
  );
};

export default Logo;
