import React from "react";
import gql from "graphql-tag";

export default function LayoutRenderer({ data, layout }) {
  const Layout = React.useMemo(() => require(`./layouts/${layout.layoutComponent}`).default, []);

  return <Layout config={layout.config && JSON.parse(layout.config)} components={layout.components} data={data} />
}

LayoutRenderer.fragments = {
  layout: gql`
    fragment LayoutRenderer_layout on Layout {
      layoutComponent
      config
      components {
        component {
          name
        }
        dataMap {
          value
          source
          destination
        }
      }
    }
  `
}
