# Federated contentful

## Components package

Exposes a `LayoutRenderer` that accepts a contentful `Layout` instance and a genaric data object for display within that layout. This acts as the interface for a frontend application to render a layout built within contentful.

Components are implemented in this package and can be rendered in any layout. We would have a single Contentful `Component` Model that would define the properties avaliable for configuration / data mapping when building a layout. No layout data would exist within the components.

The positioning and layout info for components within the layouts exist within the layout's config as a genaric object to allow a single Contentful `Layout` Model while exposing many implementations. For example, the stacked layout in the example could have a "direction" property in the config while a grid layout could have a more complex config object that may look like:

```json
{
  "positions": [
    {
      "row": 1,
      "rowSpan": 1,
      "col": 1,
      "colSpan": 12
    },
    ...
  ]
}
```

where the index of the positions property coresponds to the component index. The React implementation of the layout could pass css classes or styles based on that to the child components it renders to achieve the layout.
