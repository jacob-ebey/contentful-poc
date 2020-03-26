import React from "react";

import { index } from "../../utils";

export default function StackedLayout({ components, config, data }) {
  const importedComponents = React.useMemo(() => components.map(component => React.lazy(() => import(`../../components/${component.component.name}`))), [components]);

  const componentProps = React.useMemo(() => components.map(component => component.dataMap.reduce((p, c) => {
    if (c.value) {
      return {
        ...p,
        [c.destination]: JSON.parse(c.value)
      };
    }
    
    return {
      ...p,
      [c.destination]: index(data, c.source)
    };
  }, {})), [components, data]);

  return (
    <div>
      {importedComponents.map((Component, i) => (
        <Component {...componentProps[i]} config={components[i].config && JSON.parse(components[i].config)} />
      ))}
    </div>
  )
}
