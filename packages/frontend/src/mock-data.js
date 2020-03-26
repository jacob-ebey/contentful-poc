export default {
  page: {
    dataQuery: `
query StoriesHubQuery {
  featuredStory: storyPost(id: "25llCqo8QARP2yY5pGGaQY") {
    title
    slug
    tag
    secondaryTag
    image {
      title
      url
    }
  }
#  storyPostCollection(where: {
#    sys: {
#      id_not: "25llCqo8QARP2yY5pGGaQY"
#    }
#  }) {
  storyPostCollection {
    items {
      slug
      title
      tag
      secondaryTag
      image {
        title
        url
      }
    }
  }
}
    `,
    layouts: [
      {
        layoutComponent: "grid",
        config: JSON.stringify({
          positions: [
            {
              col: 1,
              colSpan: 5,
              row: 1,
              rowSpan: 1
            },
            {
              col: 6,
              colSpan: 7,
              row: 1,
              rowSpan: 2
            },
            {
              col: 1,
              colSpan: 6,
              row: 2,
              rowSpan: 1
            },
          ]
        }),
        components: [
          {
            component: {
              name: "text"
            },
            dataMap: [
              {
                value: JSON.stringify(`
# Sweatlife

See what inspires us everyday. From workout tips to travel advice, you'll find it here.
                `),
                destination: "markdown"
              }
            ]
          },
          {
            component: {
              name: "cover-image"
            },
            dataMap: [
              {
                source: "featuredStory.image.url",
                destination: "src"
              },
              {
                source: "featuredStory.image.title",
                destination: "alt"
              }
            ]
          },
          {
            component: {
              name: "card"
            },
            dataMap: [
              {
                source: "featuredStory.title",
                destination: "title"
              },
              {
                source: "featuredStory.tag",
                destination: "mainTag"
              },
              {
                source: "featuredStory.secondaryTag",
                destination: "secondaryTag"
              }
            ]
          }
        ]
      },

      {
        layoutComponent: "stacked",
        components: [
          {
            component: {
              name: "list"
            },
            dataMap: [
              {
                source: "storyPostCollection.items",
                destination: "items"
              },
              {
                value: JSON.stringify("hero-with-card"),
                destination: "component"
              },
              {
                value: JSON.stringify([
                  {
                    value: JSON.stringify("Medium"),
                    destination: "size"
                  },
                  {
                    source: "title",
                    destination: "title"
                  },
                  {
                    source: "tag",
                    destination: "mainTag"
                  },
                  {
                    source: "secondaryTag",
                    destination: "secondaryTag"
                  },
                  {
                    source: "image.url",
                    destination: "image.url"
                  },
                  {
                    source: "image.description",
                    destination: "alt"
                  }
                ]),
                destination: "dataMap"
              }
            ]
          }
        ]
      }
    ]
  }
};