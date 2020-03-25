import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "markdown-react-js";
import cn from "classnames";

// import styles from "./text.module.scss";
const styles = {};

function marginTopClass(margin) {
  switch (margin) {
    case "none":
      return styles.textMarginTopNone;
    case "small":
      return styles.textMarginTopSmall;
    case "medium":
      return styles.textMarginTopMedium;
    case "large":
      return styles.textMarginTopLarge;
    default:
      return "";
  }
}

function marginBottomClass(margin) {
  switch (margin) {
    case "none":
      return styles.textMarginBottomNone;
    case "small":
      return styles.textMarginBottomSmall;
    case "medium":
      return styles.textMarginBottomMedium;
    case "large":
      return styles.textMarginBottomLarge;
    default:
      return "";
  }
}

const Text = ({
  className,
  text,
  markdown,
  component,
  alignment,
  marginTop,
  marginBottom,
  size,
  style,
  weight
}) => {
  const classnames = cn([
    className,
    styles.text,
    marginTop && marginTopClass(marginTop),
    marginBottom && marginBottomClass(marginBottom),
    alignment && `lll-text-${alignment}`,
    style && `lll-text-${style || "primary"}`,
    size && `lll-text-${size || "body-1"}`,
    weight && `lll-font-weight-${weight || "regular"}`
  ]);

  const Component = component || (markdown ? "div" : "p");

  return (
    <Component className={classnames}>
      {text}
      {markdown && (
        <ReactMarkdown text={markdown} />
      )}
    </Component>
  );
};

const marginType = PropTypes.oneOf(["none", "small", "medium", "large"]);

Text.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  markdown: PropTypes.string,
  component: PropTypes.oneOf(["p", "h1", "h2", "h3", "h4", "h5", "h6"]),
  alignment: PropTypes.oneOf(["left", "center", "right"]),
  marginTop: marginType,
  marginBottom: marginType,
  size: PropTypes.oneOf([
    "body-1",
    "body-2",
    "body-3",
    "button",
    "subtitle",
    "xxlarge",
    "xlarge",
    "large",
    "medium",
    "small",
    "xsmall"
  ]),
  weight: PropTypes.oneOf(["light", "regular", "medium", "semibold"]),
  style: PropTypes.oneOf([
    "primary",
    "strikethrough",
    "error",
    "warning",
    "success",
    "info"
  ]),
  colSpan: PropTypes.number,
  colStart: PropTypes.number,
  rowSpan: PropTypes.number,
  rowStart: PropTypes.number
};

export default Text;
