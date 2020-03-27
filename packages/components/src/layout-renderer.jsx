import React from "react";
import gql from "graphql-tag";

export default function LayoutRenderer({ data, layout }) {
  const Layout = React.useMemo(() => layout && require(`./layouts/${layout.layoutComponent}`).default, [layout]);

  return Layout ? (
    <Layout
      config={layout.config && JSON.parse(layout.config)}
      components={layout.components.items} data={data}
    />
  ) : null;
}

LayoutRenderer.fragments = {
  layout: gql`
    fragment LayoutRenderer_layout on JacobPlaygroundLayout {
      layoutComponent
      config
      components: componentsCollection(limit: 10) {
        items {
          component {
            name
          }
          dataMap: dataMapCollection(limit: 10) {
            items {
              value
              source
              destination
            } 
          }
        }
      }
    }
  `
};
