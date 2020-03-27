import React from "react";
import { print } from "graphql/language/printer";
import gql from "graphql-tag";
import { useQuery } from "@micro-graphql/hooks";
import ReactMarkdown from "markdown-react-js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { CTABlock } from "@lululemon/ecom-pattern-library";

const TYPE_FRAG = gql`
  fragment Type on __Type {
    kind
    name
    description
    ofType {
      kind
      name
      ofType {
        kind
        name
      }
    }
  }
`;

const INTROSPECTION_QUERY = gql`
  query BuilderIntrospectionQuery($name: String!) {
    __schema {
      queryType {
        name
        fields {
          name
          description
          args {
            name
            type {
              ...Type
            }
            defaultValue
          }
          type {
            ...Type
          }
        }
      }
    }
    __type(name: $name) {
      ...Type
      fields {
        name
        description
        args {
          name
          type {
            ...Type
          }
          defaultValue
        }
        type {
          ...Type
        }
      }
    }
  }
  ${TYPE_FRAG}
`;

function appendToQuery(query, fieldSelections) {
  const selections = fieldSelections.slice(1);

  console.log(selections);
}

export default function QueryBuilder({ className }) {
  const [activeObjectStack, setActiveObjectStack] = React.useState([]);

  const handleGoBack = React.useCallback(() => {
    setActiveObjectStack(activeObjectStack.slice(0, activeObjectStack.length - 1));
  }, [setActiveObjectStack, activeObjectStack]);

  const queryVariables = React.useMemo(() => ({
    name: (activeObjectStack[activeObjectStack.length - 1] && activeObjectStack[activeObjectStack.length - 1].name) || ""
  }), [activeObjectStack]);

  const { data, errors, loading } = useQuery(INTROSPECTION_QUERY, queryVariables);

  const activeStack = React.useMemo(() => {
    if (data) { 
      const type = getObjectType(data.__type);

      return [
        data.__schema.queryType,
        ...activeObjectStack
      ].map(o => type && o.name === type.name ? { ...o, ...type } : o);
    }

    return activeObjectStack;
  }, [activeObjectStack, data])

  const activeObject = React.useMemo(() => {
    return activeStack[activeStack.length - 1];
  }, [activeStack]);

  const handleFieldClicked = React.useCallback((field) => (event) => {
    event.preventDefault();
    const objectType = getObjectType(field.type);

    if (objectType) {
      setActiveObjectStack([
        ...activeObjectStack,
        {
          fieldSelection: field,
          ...objectType
        }
      ]);
    }

  }, [setActiveObjectStack, activeObjectStack]);

  const [query, setQuery] = React.useState(null);

  const handleDragEnd = React.useCallback(({ draggableId, source, destination }) => {
    if (source.droppableId === "fields" && destination && destination.droppableId === "query") {
      const selectedField = activeObject.fields[source.index];

      setQuery(appendToQuery(query, [...activeStack, selectedField]));
    }
  }, [setQuery, query, activeObject]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (errors) {
    return (
      <pre className={className}>
        Errors loading data

        <code>
          {JSON.stringify(errors, null, 2)}
        </code>
      </pre>
    )
  }

  if (!data) {
    return (
      <pre className={className}><code>Introspection data could not be retrieved :(</code></pre>
    )
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={className}>
        <Droppable droppableId="query">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "lightgray" : undefined
              }}
            >
              <pre>
                <code>
                  {query ? print(query) : "No query defined yet. Drag and drop fields below to create your query."}
                </code>
              </pre>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <hr />
        {activeObjectStack.length > 0 && (
          <button onClick={handleGoBack}>&lt; Back</button>
        )}
        <h2>{activeObject.name}</h2>
        {activeObject.description && <ReactMarkdown text={activeObject.description} />}

        <Droppable droppableId="fields">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver ? "lightgray" : undefined
              }}
            >
              {activeObject && activeObject.fields && activeObject.fields.map((field, i) => (
                <Draggable isDragDisabled={isObject(field.type)} key={field.name} draggableId={field.name} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        backgroundColor: snapshot.isDragging ? "lightgray" : undefined
                      }}
                    >
                      <CTABlock href="#" heading={field.name} onClick={handleFieldClicked(field)} subContent={field.description && <ReactMarkdown text={field.description} />} />
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
