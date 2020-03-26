import React from "react";
import _ from "lodash";

export default function StackedLayout({ components, config, data }) {
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
    <div>
      {importedComponents.map((Component, i) => (
        <Component key={i} {...componentProps[i]} />
      ))}
    </div>
  )
}
