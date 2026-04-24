import PropTypes from "prop-types";
import { BASE_URL } from "../utils/api";

function Image({ src, alt, ...props }) {
  const baseUrl = BASE_URL;

  if (!src) return null;

  const finalUrl = src.startsWith("http")
    ? src
    : `${baseUrl}${src}`;

  return <img src={finalUrl} alt={alt} {...props} />;
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
}

export default Image;