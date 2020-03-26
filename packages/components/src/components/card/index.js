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
    <div className={cn([styles.card, styles.cardXLarge, className])}>
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

export default Card;

Card.propTypes = {
  ...SharedPropTypes,
  className: PropTypes.string.isRequired
};

export const CardSmall = props => {
  return <Card {...props} className={cn([styles.cardSmall, props.className])} />;
};

CardSmall.propTypes = SharedPropTypes;

export const CardMedium = props => {
  return <Card {...props} className={cn([styles.cardMedium, props.className])} />;
};

CardMedium.propTypes = SharedPropTypes;

export const CardLarge = props => {
  return <Card {...props} className={cn([styles.cardLarge, props.className])} />;
};

CardLarge.propTypes = SharedPropTypes;

export const CardXLarge = props => {
  return <Card {...props} className={cn([styles.cardXLarge, props.className])} />;
};

CardXLarge.propTypes = SharedPropTypes;
