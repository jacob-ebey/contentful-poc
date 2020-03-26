import React from "react";
import { index } from "../../utils";

export default function List({ items, component, dataMap }) {
  const Component = React.useMemo(() => React.lazy(() => import(`../${component}`)), [component]);

  return (
    <div>
      {items && items.map(item => {
        const componentProps = dataMap.reduce((p, c) => {
          if (c.value) {
            return {
              ...p,
              [c.destination]: JSON.parse(c.value)
            };
          }
          
          return {
            ...p,
            [c.destination]: index(item, c.source)
          };
        }, {});

        return <Component {...componentProps} />;
      })}
    </div>
  );
}
