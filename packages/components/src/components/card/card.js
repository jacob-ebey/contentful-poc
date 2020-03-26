import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./card.module.scss";

const SharedPropTypes = {
  title: PropTypes.string.isRequired,
  mainTag: PropTypes.string,
  secondaryTag: PropTypes.string
};

export const Card = ({ title, mainTag, secondaryTag, className }) => {
  const hasTags = mainTag || secondaryTag;

  return (
    <div className={cn([styles.card, className])}>
      {hasTags ? (
        <div className={styles.cardTags}>
          <span className={cn([styles.cardTag, styles.cardTagMain])}>
            {mainTag}
          </span>
          {secondaryTag ? (
            <>
              <span className={styles.cardTag}>•</span>
              <span className={styles.cardTag}>{secondaryTag}</span>
            </>
          ) : null}
        </div>
      ) : null}
      <div
        className={cn([
          styles.cardTitleContainer,
          styles.cardTitleContainerAccented
        ])}
      >
        <h1 className={styles.cardTitle}>{title}</h1>
      </div>
    </div>
  );
};

Card.propTypes = {
  ...SharedPropTypes,
  className: PropTypes.string.isRequired
};

export const CardSmall = props => {
  return <Card {...props} className={styles.cardSmall} />;
};

CardSmall.propTypes = SharedPropTypes;

export const CardMedium = props => {
  return <Card {...props} className={styles.cardMedium} />;
};

CardMedium.propTypes = SharedPropTypes;

export const CardLarge = props => {
  return <Card {...props} className={styles.cardLarge} />;
};

CardLarge.propTypes = SharedPropTypes;

export const CardXLarge = props => {
  return <Card {...props} className={styles.cardXLarge} />;
};

CardXLarge.propTypes = SharedPropTypes;
