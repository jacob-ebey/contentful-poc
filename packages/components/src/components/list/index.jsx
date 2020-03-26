import React from "react";
import _ from "lodash";

import Masonry from 'react-masonry-css';

import styles from "../../layouts/masonary/masonary.module.css"

export default function List({ items, component, dataMap }) {
  const Component = React.useMemo(() => require(`../${component}`).default, [component]);
  
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
      {items && items.map(item => {
        const componentProps = dataMap.reduce((p, c) => {
          if (c.value) {
            return _.set(p, c.destination, JSON.parse(c.value));
          }
          
          if (!c.source || c.source === ".") {
            return _.set(p, c.destination, item);
          }

          return _.set(p, c.destination, _.get(item, c.source));
        }, {});

        return <Component {...componentProps} />;
      })}
    </Masonry>
  );
}
