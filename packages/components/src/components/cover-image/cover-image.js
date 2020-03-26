import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import styles from "./cover-image.module.scss";

const CoverImage = ({ src, alt, className }) => {
  return (
    <div
      className={cn([styles.flexEmbed, styles.coverImage, className])}
      style={{ backgroundImage: `url(${src})` }}
    >
      <span className="lll-hidden-visually">{alt}</span>
    </div>
  );
};

CoverImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default CoverImage;
