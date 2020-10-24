import React, { MetaHTMLAttributes } from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { Props, SiteQuery } from "@types";

const SEO = ({ description = "", lang = "en", meta = [], title }: Props) => {
  const { site }: SiteQuery = useStaticQuery(
    graphql`
      query Site {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );
  const metaDescription = description ?? site?.siteMetadata?.description ?? "";
  const metaItems: MetaHTMLAttributes<HTMLMetaElement>[] = [
    {
      name: "description",
      content: metaDescription,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: metaDescription,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      name: "twitter:creator",
      content: site?.siteMetadata?.author ?? "",
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: metaDescription,
    },
  ];

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site?.siteMetadata?.title}`}
      meta={metaItems.concat(meta)}
    />
  );
};

export default SEO;
