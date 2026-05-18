import { Helmet } from "react-helmet-async";
import { useLanguage } from "../hooks/useLanguage";
import PropTypes from "prop-types";

function SEO({ title, description }) {
  const { lang } = useLanguage();

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://wedevolv.com" />

      <link rel="alternate" hrefLang="en" href="https://wedevolv.com/?lang=en" />
      <link rel="alternate" hrefLang="id" href="https://wedevolv.com/?lang=id" />
      <link rel="alternate" hrefLang="x-default" href="https://wedevolv.com/" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://wedevolv.com" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://wedevolv.com/og-image.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Wedevolv - Developer Portfolio Builder" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://wedevolv.com/og-image.png" />

      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default SEO;