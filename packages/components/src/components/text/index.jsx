import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "markdown-react-js";
import cn from "classnames";

import "@lululemon/ecom-pattern-library/lib/styles/base.css";
import "@lululemon/ecom-pattern-library/lib/styles/fonts.css";

const Text = ({
  className,
  text,
  markdown,
  component,
  alignment,
  size,
  style,
  weight
}) => {
  const classnames = cn([
    "lll-base",
    className,
    alignment && `lll-text-${alignment}`,
    style && `lll-text-${style || "primary"}`,
    size && `lll-text-${size || "body-1"}`,
    weight && `lll-font-weight-${weight || "regular"}`
  ]);

  const Component = component || (markdown ? "div" : "p");

  console.log(markdown);

  return (
    <Component className={classnames}>
      {text}
      {markdown && (
        <ReactMarkdown text={markdown} />
      )}
    </Component>
  );
};

Text.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  markdown: PropTypes.string,
  component: PropTypes.oneOf(["p", "h1", "h2", "h3", "h4", "h5", "h6"]),
  alignment: PropTypes.oneOf(["left", "center", "right"]),
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
