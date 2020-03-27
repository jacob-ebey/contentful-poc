import React from "react";
import _ from "lodash";

import Masonry from 'react-masonry-css';

import styles from "./masonary.module.css";

export default function MasonryLayout({ components, config, data }) {
  const importedComponents = React.useMemo(() => components.map(component => require(`../../components/${component.component.name}`).default), [components]);

  const componentProps = React.useMemo(() => components.map(component => component.dataMap.items.reduce((p, c) => {
    if (c.value) {
      return _.set(p, c.destination, JSON.parse(c.value));
    }

    if (!c.source || c.source === ".") {
      return _.set(p, c.destination, data);
    }
    
    return _.set(p, c.destination, _.get(data, c.source));
  }, {})), [components, data]);

  return (
    <Masonry
      breakpointCols={{
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {importedComponents.map((Component, i) => (
        <Component key={i} {...componentProps[i]} />
      ))}
    </Masonry>
  )
}
