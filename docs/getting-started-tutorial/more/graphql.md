# Headless Mode + GraphQL

Craft can also act as a “headless” CMS. This style of website or application is typically split into two halves: a back-end, which is responsible for managing content and exposing a developer-friendly API; and a decoupled front-end, that requests data over HTTP from the back-end and displays it to users. Instead of rendering Twig templates on the server, you’ll use the built-in GraphQL API to fetch content and render it with whatever client-side view library you or your team is familiar with.

Craft’s GraphQL API will feel familiar, now that you have experience with loading content in a Twig environment!

::: warning
Building a front end this way is heavily reliant on experience with JavaScript and other web technologies—there are also a _ton_ of options when it comes to frameworks and approaches! This guide will only explore GraphQL basics that are generally applicable.
:::

## Overview

GraphQL is a popular and expressive query language that works well with Craft’s flexible content modeling tools. In most cases, fetching content with GraphQL is analogous to using element queries in Twig—but instead of returning native element objects, the structure and substance of JSON output from GraphQL is determined by the _client_ rather than the _server_. Craft would ordinarily return _all_ native and custom field data for an element, but GraphQL requires that you explicitly include each property.

## Configure GraphQL

Let’s open the GraphiQL explorer to browse the auto-generated schema and documentation, by clicking **GraphQL**, then **GraphiQL**.

<BrowserShot url="https://tutorial.ddev.site/admin/graphiql" :link="false" caption="The GraphiQL explorer.">
<img src="../images/graphiql.png" alt="Screenshot of GraphiQL" />
</BrowserShot>

::: tip
[GraphiQL](https://www.electronjs.org/apps/graphiql) is a GUI tool for using the [GraphQL query language](https://graphql.org/). The former is often mistaken for a typo and the difference is subtle!
:::

Clear out the comments in the query editor and try running a simple query:

```graphql
{ ping }
```

You’ll see `pong` in the response pane, signaling that everything’s ready to go:

<BrowserShot url="https://tutorial.ddev.site/admin/graphiql?query=%7B%20ping%20%7D%0A" :link="false" caption="It’s working!">
<img src="../images/graphiql-ping.png" alt="Screenshot of GraphiQL with simple query and response" />
</BrowserShot>

By default, the Craft CMS GraphiQL interface will use the full “schema” without any restrictions—in other words, it has access to _all content_ through the GraphQL API, including mutations. You can switch schemas with the menu at the top of the screen.

To use GraphQL *externally* (without a privileged user session), you’ll need to do two things:

1. [Establish a GraphQL API endpoint](/5.x/development/graphql.md#setting-up-your-api-endpoint) for querying externally.
2. Either create your own private schema (and an access token), or edit the public schema to enable querying content without an access token. (By default, the public schema leaves all content disabled.) See [Define Your Schemas](/5.x/development/graphql.md#define-your-schemas) in the GraphQL documentation.

## Optional: Enable Headless Mode

If you want to query Craft for content but handle your own routing, you can enable <config5:headlessMode>. This optimizes the installation and UI, hiding template settings (like how we connected _Blog_ section entries to `templates/blog/_entry.twig`), disabling all routes except for the control panel, and returning JSON for all front-end requests.

To enable headless mode, add this to `config/general.php`:

```php{6}
<?php
use craft\config\GeneralConfig;

return GeneralConfig::create()
    // ...
    ->headlessMode(true)
;
```

## Twig examples as GraphQL queries

Content can be fetched via GraphQL with the same parameters we’ve already used in Twig. Ultimately, Craft is still using [element queries](/5.x/development/element-queries.md) to decide what data should be loaded.

Let’s retrace each step of the tutorial where we fetched content, seeing how the Twig example maps to a GraphQL query.

### `_layout`

The base template includes the default Craft CMS language, site name, and site description:

- `craft.app.language`
- `siteName`
- `siteInformation.siteDescription`

These aren’t available via the GraphQL API, but if you needed them you could store each in a global set, like we did for the description:

::: code
```graphql Query
{
  globalSet(handle: "siteInfo") {
    ... on siteInfo_GlobalSet {
      description
    }
  }
}
```
```json Response
{
  "data": {
    "globalSet": {
      "description": "Hello, world!"
    }
  }
}
```
:::

### `blog/_entry`

The blog post detail template displays an entire blog post with its full content.

- `entry.title`
- `entry.postDate`
- `entry.featureImage`
  - `title`
  - `url`
  - dynamic `getUrl()` transform at 900×600px
- `entry.postContent`
  - `block.type`
  - `block.text`
  - `block.image`, an assets field
- `entry.postCategories`
  - `title`
  - `url`
- `siteInfo.description`, processed by Markdown

When Craft is in charge of routing, it matches the requested URL against existing entries, then loads and exposes it as `entry` in the template. We don’t have that routing mechanism in the GraphiQL IDE, so we’re going to specify the known slug `my-trip-to-bend` for this example.

We also used `postDate` in two different formats, so we’re using the [GraphQL alias](https://graphql.org/learn/queries/#aliases) `postDateAlt` to return a second format for parity.

::: code
```graphql Query
{
  entry(slug: "my-trip-to-bend") {
    title
    postDate @formatDateTime(format: "d M Y")
    postDateAlt: postDate @formatDateTime(format: "Y-m-d")
    url
    ... on post_Entry {
      featureImage {
        title
        url
        sized: url @transform(width: 900, height: 600, quality: 90)
      }
      postContent {
        ... on text_Entry {
          typeHandle
          text
        }
        ... on image_Entry {
          typeHandle
          image {
            title
            url
          }
        }
      }
      postCategories {
        title
        url
      }
    }
  }
  globalSet(handle: ["siteInfo"]) {
    ... on siteInfo_GlobalSet {
      description @markdown
    }
  }
}
```
```json Response
{
  "data": {
    "entry": {
      "title": "My Trip to Bend",
      "postDate": "15 Oct 2024",
      "postDateAlt": "2024-10-15",
      "url": "https://tutorial.ddev.site/blog/my-trip-to-bend",
      "featureImage": [
        {
          "title": "Highway 26",
          "url": "https://tutorial.ddev.site/uploads/images/highway-26.JPG",
          "sized": "https://tutorial.ddev.site/uploads/_900x600_crop_center-center_90_none/5/highway-26.jpg"
        }
      ],
      "postContent": [
        {
          "typeHandle": "text",
          "text": "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo."
        },
        {
          "typeHandle": "image",
          "image": [
            {
              "title": "Warm Springs",
              "url": "https://tutorial.ddev.site/uploads/images/warm-springs.JPG"
            }
          ]
        },
        {
          "typeHandle": "text",
          "text": "Vestibulum id ligula porta felis euismod semper. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam quis risus eget urna mollis ornare vel eu leo.\n\nCras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit."
        }
      ],
      "postCategories": [
        {
          "title": "Trips",
          "url": "https://tutorial.ddev.site/blog/topic/trips"
        },
        {
          "title": "Oregon",
          "url": "https://tutorial.ddev.site/blog/topic/oregon"
        }
      ]
    },
    "globalSet": {
      "description": "<p>Photos and stories from around the Pacific Northwest.</p>\n"
    }
  }
}
```
:::

You’ll notice that anything with its own field layout implements its own element interface, which is why properties consistent for all element types (`title`, `postDate`, `slug`, etc.) are readily available while custom fields must be queried in the context of a relevant element interface—like everything nested within `... on post_Entry {}`.

### `blog/index`

The blog listing page displays a thumbnail icon and summary for every entry.

This is fairly straightforward with GraphQL. We’ll expose the custom focal point as well in case the front end might make use of it:

::: code
```graphql Query
{
  entries(section: "blog") {
    title
    postDate @formatDateTime(format: "d M Y")
    url
    ... on post_Entry {
      summary
      featureImage {
        title
        url
        sized: url @transform(width: 300, height: 300)
        focalPoint
      }
    }
  }
}
```
```json Response
{
  "data": {
    "entries": [
      {
        "title": "Over the Mountain",
        "postDate": "15 Oct 2024",
        "url": "https://tutorial.ddev.site/blog/over-the-mountain",
        "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "featureImage": [
          {
            "title": "Warm Springs",
            "url": "https://tutorial.ddev.site/uploads/images/warm-springs.JPG",
            "sized": "https://tutorial.ddev.site/uploads/_300x300_crop_center-center_none/7/warm-springs.jpg",
            "focalPoint": [
              0.5,
              0.5
            ]
          }
        ]
      },
      {
        "title": "My Trip to Bend",
        "postDate": "15 Oct 2024",
        "url": "https://tutorial.ddev.site/blog/my-trip-to-bend",
        "summary": "Sed posuere consectetur est at lobortis.",
        "featureImage": [
          {
            "title": "Highway 26",
            "url": "https://tutorial.ddev.site/uploads/images/highway-26.JPG",
            "sized": "https://tutorial.ddev.site/uploads/_300x300_crop_center-center_none/5/highway-26.jpg",
            "focalPoint": [
              0.5,
              0.5
            ]
          }
        ]
      }
    ]
  }
}
```
:::

### `blog/_category`

The blog category listing is the same as the listing layout above, limited to a specific category defined in the page URL.

We’ll use the `relatedTo` query parameter, which requires IDs as its arguments. We can relate to the “Trips” category by its ID, which we can get with another GraphQL query or by visiting _Categories_ and finding the numeric ID in the control panel URL.

::: code
```graphql Query
{
  categories {
    id
    title
  }
}
```
```json{5-6} Response
{
  "data": {
    "categories": [
      {
        "id": "11",
        "title": "Trips"
      },
      {
        "id": "12",
        "title": "Oregon"
      },
      {
        "id": "22",
        "title": "Summer"
      }
    ]
  }
}
```
:::

If the ID for that category is `11`, the listing query could limit results by that relationship:

```graphql
{
  entries(section: "blog", relatedTo: 11) {
    title
    # ...
  }
}
```

Limiting on more than one category ID, like entries in category `11` _or_ `22`, would be a matter of passing an array:

```graphql
{
  entries(section: "blog", relatedTo: [30, 40]) {
    title
    # ...
  }
}
```

For more on querying using relationships, see the [Relations](/5.x/system/relations.md) page in the Craft CMS documentation.

### `_singles/about`

The about page is a Single, which is sort of a section and an entry and can be queried either way; using the `section` or `slug` parameter with a value of `about`.

- `entry.profileImage`
- `entry.bio`

::: code Query
```graphql
{
  entry(section: "about") {
    ... on about_Entry {
      profileImage {
        title
        url
      }
      bio
    }
  }
}
```
```json Response
{
  "data": {
    "entry": {
      "title": null,
      "profileImage": [
        {
          "title": "Lake Billy Chinook",
          "url": "https://tutorial-five.ddev.site/uploads/images/lake-billy-chinook.jpeg"
        }
      ],
      "bio": "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nCurabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna mollis euismod."
    }
  }
}
```
:::

## Explore GraphQL further

As with the Twig examples, we’re just scratching the surface of ways you can fetch content with Craft CMS.

See the [GraphQL API](/5.x/development/graphql.md) section of the Craft CMS documentation to learn more about working with GraphQL, or install the [Element API](plugin:element-api) plugin to start building custom JSON endpoints!
