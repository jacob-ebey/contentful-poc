import React from "react";

import LayoutRenderer from "../layout-renderer";

import QueryBuilder from "./query-builder";

import styles from "./layout-builder.module.css";

export default function LayoutBuilder() {
  return (
    <div className={styles.layoutBuilder}>
      <LayoutRenderer />
      
      <QueryBuilder className={styles.queryBuilder} />
    </div>
  )
}
