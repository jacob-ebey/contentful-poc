import React from "react";
import ReactDOM from "react-dom";
import { createCache, createClient } from "@micro-graphql/core";
import { MicroGraphQLProvider } from "@micro-graphql/hooks";

import App from "./app";

const client = createClient({
  cache: createCache(),
  fetch,
  url: "https://mock-contentful-api.com"
});

ReactDOM.render(
  <MicroGraphQLProvider client={client}>
    <App />
  </MicroGraphQLProvider>
, document.getElementById("root"));
