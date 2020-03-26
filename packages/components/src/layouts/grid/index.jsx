import React from "react";
import _ from "lodash";

import styles from "./twelve-column-grid.module.scss";

function applyGridClassnames({ colSpan, col, rowSpan, row }) {
  return [
    colSpan && `col-${colSpan}`,
    col && `col-start-${col}`,
    rowSpan && `row-${rowSpan}`,
    row && `row-start-${row}`
  ];
}

export default function GridLayout({ components, config, data }) {
  const importedComponents = React.useMemo(() => components.map(component => require(`../../components/${component.component.name}`).default), [components]);

  const componentProps = React.useMemo(() => components.map(component => component.dataMap.reduce((p, c) => {
    if (c.value) {
      return _.set(p, c.destination, JSON.parse(c.value));
    }

    if (!c.source || c.source === ".") {
      return _.set(p, c.destination, data);
    }
    
    return _.set(p, c.destination, _.get(data, c.source));
  }, {})), [components, data]);

  return (
    <div className={styles.twelveColumnGrid}>
      {importedComponents.map((Component, i) => (
        <Component key={i} {...componentProps[i]} className={applyGridClassnames((config.positions && config.positions[i]) || {})} />
      ))}
    </div>
  )
}
