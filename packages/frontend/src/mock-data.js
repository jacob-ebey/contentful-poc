export default {
  layout: {
    layoutComponent: "stacked",
    dataQuery: `
query DataQuery {
  story(id: "someid") {
    title
  }
}
    `,
    components: [
      {
        component: {
          name: "text"
        },
        dataMap: [
          {
            source: "story.title",
            destination: "text"
          },
          {
            value: JSON.stringify("xxlarge"),
            destination: "size"
          }
        ]
      },
      {
        component: {
          name: "text"
        },
        dataMap: [
          {
            source: "story.body",
            destination: "markdown"
          }
        ]
      },
      {
        component: {
          name: "text"
        },
        dataMap: [
          {
            value: JSON.stringify("You can also map data to lists of arbitrary components"),
            destination: "text"
          }
        ]
      },
      {
        component: {
          name: "list"
        },
        dataMap: [
          {
            source: "story.locations",
            destination: "items"
          },
          {
            value: JSON.stringify("text"),
            destination: "component"
          },
          {
            value: JSON.stringify([
              {
                source: ".",
                destination: "text"
              }
            ]),
            destination: "dataMap"
          }
        ]
      }
    ]
  },
  story: {
    title: "Running with Person Name",
    overview: "I'm a quick overview...",
    body: `
# I'm the story body

As you can see, I fully support [markdown](https://www.markdownguide.org/basic-syntax/)...
    `,
    locations: ["Seattle", "Portland"]
  }
};