import React from "react";

export default function LayoutRenderer({ data, layout }) {
  const Layout = React.useMemo(() => React.lazy(() => import(`./layouts/${layout.layoutComponent}`)), []);

  return <Layout config={layout.config} components={layout.components} data={data} />
}
