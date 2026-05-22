import PropTypes from "prop-types";
import { BASE_URL } from "../utils/api";

function Image({ src, alt, onClick }) {
  const baseUrl = BASE_URL;

  if (!src) return null;

  const finalUrl = src.startsWith("http")
    ? src
    : `${baseUrl}${src}`;

  return (
    <img
      src={finalUrl}
      alt={alt}
      onClick={onClick}
    />
  )
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
}

export default Image;