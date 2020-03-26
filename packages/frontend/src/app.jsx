import React from "react";
import { parse } from "graphql/language/parser";
import gql from "graphql-tag";
import { useQuery } from "@micro-graphql/hooks";

import LayoutRenderer from "contentful_components/layout-renderer";

import layoutData from "./mock-data";

// const QUERY = gql`
//   query GetLayoutQuery($id: ID!) {
//     layout(id: $id) {
//       ...LayoutRenderer_layout
//     }
//   }
//   ${LayoutRenderer.fragments.layout}
// `;

export default function App() {
  // const { data: layoutData, errors: layoutErrors, loading: layoutLoading } = useQuery(QUERY, { id: "story-page-layout" });

  const dataQuery = React.useMemo(() => layoutData && parse(layoutData.page.dataQuery), [layoutData]);
  const { data, errors, loading } = useQuery(dataQuery, undefined, { skip: !dataQuery });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (errors) {
    return (
      <pre>
        Errors loading data

        <code>
          {JSON.stringify(errors, null, 2)}
        </code>
      </pre>
    )
  }

  if (!layoutData || !data) {
    return (
      <pre><code>No data was found for the page</code></pre>
    )
  }

  return (
    <div style={{ background: "#f9f9f9" }}>
      {layoutData.page.layouts.map(layout => (
        <LayoutRenderer layout={layout} data={data} />
      ))}
    </div>
  )
}
