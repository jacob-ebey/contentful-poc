import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import CoverImage from "../cover-image";
import { CardSmall, CardMedium, CardLarge, CardXLarge } from "../card";

import styles from "./hero-with-card.module.scss";

const SharedPropTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  webRoute: PropTypes.string.isRequired,
  mainTag: PropTypes.string,
  secondaryTag: PropTypes.string,
  colSpan: PropTypes.number
};

const SizeToCard = new Map([
  [
    "Small",
    { className: styles.heroWithCardImgSmall, CardComponent: CardSmall }
  ],
  [
    "Medium",
    { className: styles.heroWithCardImgMedium, CardComponent: CardMedium }
  ],
  [
    "Large",
    { className: styles.heroWithCardImgLarge, CardComponent: CardLarge }
  ],
  [
    "XLarge",
    { className: styles.heroWithCardImgXLarge, CardComponent: CardXLarge }
  ]
]);

const HeroWithCard = ({
  title,
  image: { url, description },
  webRoute,
  mainTag = "",
  secondaryTag = "",
  size,
  className: providedClassName
}) => {
  const { className, CardComponent } = SizeToCard.get(size);

  return (
    <a
      className={cn([
        providedClassName,
        "lll-base",
        styles.heroWithCardLink
      ])}
      href={webRoute}
    >
      <div className={styles.heroWithCard}>
        <CoverImage
          src={url}
          alt={description}
          className={cn([styles.heroWithCardImg, className])}
        />
        <CardComponent
          title={title}
          mainTag={mainTag}
          secondaryTag={secondaryTag}
          className={styles.heroCard}
        />
      </div>
    </a>
  );
};

HeroWithCard.propTypes = {
  ...SharedPropTypes,
  size: PropTypes.oneOf(["Small", "Medium", "Large", "XLarge"])
};

export default HeroWithCard;
