import React from "react";
import { parse } from "graphql/language/parser";
import gql from "graphql-tag";
import { useQuery } from "@micro-graphql/hooks";

import LayoutRenderer from "contentful_components/layout-renderer";

const QUERY = gql`
  query StoriesHubQuery($id: String!) {
    page: jacobPlaygroundStoriesHub(id: $id) {
      dataQuery
      layouts: layoutsCollection(limit: 10) {
        items {
          ...LayoutRenderer_layout
        }
      }
    }
  }
  ${LayoutRenderer.fragments.layout}
`;

const pageVariables = {
  id: "368HmB6SjWuOz7g9PV4ELp"
}

const PLACEHOLDER_QUERY = gql`
  query Placeholder {
    __schema {
      queryType {
        name
      }
    }
  }
`;

export default function App() {
  const { data: layoutData, errors: layoutErrors, loading: layoutLoading } = useQuery(
    QUERY,
    pageVariables
  );

  
  const dataQuery = React.useMemo(() => layoutData && parse(layoutData.page.dataQuery), [layoutData]);
  const { data, errors, loading } = useQuery(dataQuery || PLACEHOLDER_QUERY, undefined, { skip: !dataQuery });

  if (loading || layoutLoading) {
    return <h1>Loading...</h1>;
  }

  if (errors || layoutErrors) {
    return (
      <pre>
        Errors loading data

        <code>
          {JSON.stringify(errors || layoutErrors, null, 2)}
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
      {layoutData.page.layouts.items.map((layout, i) => (
        <LayoutRenderer key={i} layout={layout} data={data} />
      ))}
    </div>
  )
}
