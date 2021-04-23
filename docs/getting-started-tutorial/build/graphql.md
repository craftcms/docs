# Fetch content with GraphQL

You can also use Craft CMS headlessly, meaning your web server provides the authoring experience but relies on outside code to provide the front end for visitors. You won’t display content with server-side Twig templates, but use an API to fetch the content and present it in a separate, de-coupled front end.

The Pro edition of Craft CMS includes a GraphQL API for working with Craft content. If you’ve already modeled content and used it in Twig templates, the GraphQL API should feel familiar.

::: warning
Building a front end this way requires more development experience than we’ve covered in this tutorial. We’ll only touch on GraphQL basics and recommend more resources.
:::

## Overview

GraphQL is a developer API for querying Craft CMS content. Fetching content, or [querying elements](/3.x/element-queries.md) in Craft-specific terms, is almost identical to how you would fetch content in Twig templates. Before you can use the API, you need to configured Craft CMS to make it available.

## Configure GraphQL

The Craft CMS GraphQL API requires Craft Pro. You can start a Pro trial locally and use it however long you’d like—there’s no time limit for the trial. You can also downgrade again safely if you’d like to keep using the free Solo edition.

First upgrade your Craft Solo edition to Craft Pro:

1. From the control panel, choose the **Solo** badge at the bottom of the screen.
2. In the <badge type="edition" vertical="middle">Pro</badge> panel, choose **Try for free**.

<BrowserShot url="https://tutorial.nitro/admin/plugin-store/upgrade-craft" :link="false" caption="Upgrading from Solo to Pro.">
<img src="../images/upgrade-pro.png" alt="Screenshot of plugin store upgrading to Craft Pro trial" />
</BrowserShot>

Once you edition is upgraded and you’ll see a GraphQL item in the navigation menu. Choose that.

This is the GraphiQL explorer for browsing API documentation and running queries directly in the browser:

<BrowserShot url="https://tutorial.nitro/admin/graphql" :link="false" caption="The GraphiQL explorer.">
<img src="../images/graphql.png" alt="Screenshot of GraphiQL" />
</BrowserShot>

::: tip
[GraphiQL](https://www.electronjs.org/apps/graphiql) is a GUI tool for using the [GraphQL query language](https://graphql.org/). The former is often mistaken for a typo and the difference is subtle!
:::

Try running a test GraphQL query:

```graphql
{ ping }
```

You’ll see `pong` in the response signaling that everything’s ready to go:

<BrowserShot url="https://tutorial.nitro/admin/graphql?query=%7B%20ping%20%7D%0A" :link="false" caption="It’s working!">
<img src="../images/graphql-ping.png" alt="Screenshot of GraphiQL with simple query and response" />
</BrowserShot>

By default, the Craft CMS GraphiQL interface will use the full schema, or available set of information, without any restrictions. In other words, it has access to all content through the GraphQL API.

To use GraphQL *externally*, you’ll need to do two things:

1. [Establish a GraphQL API endpoint](/3.x/graphql.md#create-your-api-endpoint) for querying externally.
2. Either create your own private schema with a secret access token, or edit the public schema to enable querying content without an access token. (By default, the public schema leaves all content disabled.) See [Define Your Schemas](/3.x/graphql.md#getting-started) in the GraphQL documentation.

## Optionally enable headless mode

If you want to query Craft CMS for content but handle your own routing, you can enable [`headlessMode`](/3.x/config/config-settings.md#headlessmode). This will optimize the installation to hide template settings and route management and return all front end responses as JSON.

To enable headless mode, add `'headlessMode' => true` to `config/general.php`:

```php{7}
<?php
// ...
return [
    // Global settings
    '*' => [
        // ...
        'headlessMode' => true
    ],

    // ...
];
```

## Twig examples as GraphQL queries

Content may be fetched with GraphQL in the same way as with Twig: using [element queries](/3.x/element-queries.md).

Let’s retrace each step of the tutorial where we fetched content, seeing how the Twig example maps to a GraphQL query.

### `_layout`

The base template includes the default Craft CMS language and site name.

- `craft.app.language`
- `siteName`

These aren’t available via the GraphQL API, but if you needed them you could store each in a global set field like the generic description.

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
  - `block.image` Assets field
- `entry.postCategories`
  - `title`
  - `url`
- `siteInformation.siteDescription` processed by markdown

With the Twig setup, the web server provides its URL to Craft CMS, which uses its routing logic to fetch the entry and make it available as `entry` in the template.

We don’t have routing logic running GraphQL queries, so we’ll query on the known slug `my-first-post` for this example. Grab any slug from one of your test entries.

We also used `postDate` in two different formats, so we’re using the [GraphQL alias](https://graphql.org/learn/queries/#aliases) `postDateAlt` to return a second format for parity.

```graphql
{
  entry(slug: "my-first-post") {
    title
    postDate @formatDateTime(format: "d M Y")
    postDateAlt: postDate @formatDateTime(format: "Y-m-d")
    url
    ... on blog_blog_Entry {
      featureImage {
        title
        url
        sized: url @transform(width: 900, height: 600, quality: 90)
      }
      postContent {
        ... on postContent_text_BlockType {
          typeHandle
          text
        }
        ... on postContent_image_BlockType {
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
  globalSet(handle: ["siteInformation"]) {
    ... on siteInformation_GlobalSet {
      siteDescription @markdown
    }
  }
}
```

You’ll notice that anything with its own field layout implements its own element interface, which is why properties consistent for all element types (`title`, `postDate`, `slug`, etc.) are readily available while custom fields must be queried in the context of a relevant element interface such as everything nested within `... on blog_blog_Entry {}`.

The response should be something like this:

```json
{
  "data": {
    "entry": {
      "title": "My first post",
      "postDate": "20 Mar 2020",
      "postDateAlt": "2020-03-20",
      "url": "https://tutorial.nitro/blog/my-first-post",
      "featureImage": [
        {
          "title": "Craft Image from Unsplash",
          "url": "https://tutorial.nitro/assets/blog/tim-gouw-rXBwosfgG-c-unsplash.jpg",
          "sized": "https://tutorial.nitro/assets/blog/_900x600_crop_center-center_90_none/tim-gouw-rXBwosfgG-c-unsplash.jpg"
        }
      ],
      "postContent": [
        {
          "typeHandle": "text",
          "text": "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>"
        },
        {
          "typeHandle": "image",
          "image": [
            {
              "title": "Little Drinks",
              "url": "https://tutorial.nitro/assets/blog/rosie-kerr-Z0iBELYV8uk-unsplash.jpg"
            }
          ]
        },
        {
          "typeHandle": "text",
          "text": "<p>Sed dignissim purus eget lectus bibendum blandit blandit id dui. Ut odio lectus, sodales quis convallis ac, tincidunt in nunc. Integer a est justo, pharetra iaculis turpis. Donec vehicula lorem eu sem condimentum at semper velit fermentum. Phasellus euismod quam vel felis aliquet fringilla. In volutpat diam id purus rutrum vestibulum. Praesent at purus risus, non tristique nibh.</p>\n"
        }
      ],
      "postCategories": [
        {
          "title": "Ramblings",
          "uri": "https://tutorial.nitro/blog/category/ramblings"
        }
      ]
    },
    "globalSet": {
      "siteDescription": "<p>This is our tutorial site where we’ve built a blog from scratch with Craft CMS.</p>\n"
    }
  }
}
```

### `blog/index`

The blog listing page displays a thumbnail icon and summary for every entry.

This is fairly straightforward with GraphQL. We’ll expose the custom focal point as well in case the front end might make use of it:

```graphql
{
  entries(section: "blog") {
    title
    url
    ... on blog_blog_Entry {
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

Result:

```json
{
  "data": {
    "entries": [
      {
        "title": "My first post",
        "url": "https://tutorial.nitro/blog/my-first-post",
        "featureImage": [
          {
            "title": "Craft Image from Unsplash",
            "url": "https://tutorial.nitro/assets/blog/tim-gouw-rXBwosfgG-c-unsplash.jpg",
            "sized": "https://tutorial.nitro/assets/blog/_300x300_crop_center-center_none/tim-gouw-rXBwosfgG-c-unsplash.jpg",
            "focalPoint": [0.2059, 0.6287]
          }
        ]
      }
    ]
  }
}
```

### `blog/_category`

The blog category listing is the same as the listing layout above, limited to a specific category defined in the page URL.

We’ll use the `relatedTo` query parameter, which requires IDs as its arguments. We can relate to the “Ramblings” category by its ID, which we can get with another GraphQL query or by visiting “Categories” and finding the numeric ID in the control panel URL.

```graphql
{
  categories {
    id
    title
  }
}
```

```json
{
  "data": {
    "categories": [
      {
        "id": "30",
        "title": "Ramblings"
      }
    ]
  }
}
```

If the ID for that category is `30`, the listing query could limit results by that relationship:

```graphql
{
  entries(section: "blog", relatedTo: 30) {
    title
    # ...
  }
}
```

Limiting on more than one category ID, like entries in category `30` or `40`, would be a matter of passing an array:

```graphql
{
  entries(section: "blog", relatedTo: [30, 40]) {
    title
    # ...
  }
}
```

For more on relationship querying, see the [Relations](/3.x/relations.md) page in the Craft CMS documentation.

### `_singles/about`

The about page is a Single, which is sort of a section and an entry and can be queried either way; using the `section` or `slug` parameter with a value of `about`.

- `entry.title`
- `entry.aboutImage`
- `entry.postContent`
  - `block.type`
  - `block.text`
  - `block.image` Assets field

```graphql
{
  entry(section: "about") {
    title
    ... on about_about_Entry {
      aboutImage {
        title
        url
      }
      postContent {
        ... on postContent_text_BlockType {
          typeHandle
          text
        }
        ... on postContent_image_BlockType {
          typeHandle
          image {
            title
            url
          }
        }
      }
    }
  }
}
```

Result:

```json
{
  "data": {
    "entry": {
      "title": "About",
      "aboutImage": [
        {
          "title": "Floating in Space",
          "url": "https://tutorial.nitro/assets/general/nasa-Yj1M5riCKk4-unsplash.jpg"
        }
      ],
      "postContent": [
        {
          "typeHandle": "text",
          "text": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nibh quam, consequat et pellentesque non, malesuada vulputate risus. Donec et nisi sit amet nisi aliquam pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum hendrerit neque tincidunt massa tempus cursus dictum diam vulputate. Morbi aliquet, mi ut aliquam varius, nunc augue pellentesque felis, nec blandit sapien nunc vitae odio. Vivamus pretium metus sit amet urna iaculis id accumsan massa tincidunt. Maecenas posuere nibh id magna porta ullamcorper. Nunc tortor velit, tincidunt sit amet dapibus at, lacinia ac sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin feugiat iaculis sem ac blandit. Integer dignissim lacinia dolor eu elementum.</p>\n<p>Sed dignissim purus eget lectus bibendum blandit blandit id dui. Ut odio lectus, sodales quis convallis ac, tincidunt in nunc. Integer a est justo, pharetra iaculis turpis. Donec vehicula lorem eu sem condimentum at semper velit fermentum. Phasellus euismod quam vel felis aliquet fringilla. In volutpat diam id purus rutrum vestibulum. Praesent at purus risus, non tristique nibh.</p>\n<p>Quisque rutrum, dolor id viverra varius, odio libero dapibus augue, ac semper felis quam a dolor. Praesent sagittis quam et justo consequat luctus. Fusce posuere augue nec ipsum rhoncus id vestibulum libero consectetur. Etiam luctus ultricies neque, at viverra est tincidunt mollis. Nam sollicitudin sollicitudin gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut non sem a tortor ultricies fringilla. Nam ac velit nulla, eu ullamcorper tellus. Donec interdum hendrerit nisi, et tempus dolor pulvinar at. Mauris lacinia sollicitudin est vitae rutrum. Nullam ullamcorper interdum bibendum.</p>"
        }
      ]
    }
  }
}
```

## Explore GraphQL further

As with the Twig examples, we’re just scratching the surface of ways you can fetch content with Craft CMS.

See the [GraphQL API](/3.x/graphql.md) section of the Craft CMS documentation to learn more about working with GraphQL.

You may also want to check out our [blog starter project](https://github.com/craftcms/starter-blog) that includes an example Craft CMS + [Gatsby](https://www.gatsbyjs.org/) integration.
