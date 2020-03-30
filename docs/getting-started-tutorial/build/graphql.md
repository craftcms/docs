## Fetch content with GraphQL

You can also use Craft CMS headlessly, meaning your web server provides an authoring experience but relies on outside code to provide the front end for visitors. In this case you won’t work with Twig templates, but Craft’s GraphQL API.

### Overview

GraphQL is a developer API for querying Craft CMS content to be used by some other code. Fetching content, or [querying elements](https://docs.craftcms.com/v3/dev/element-queries/), is almost identical to how you would fetch content in Twig templates once you’ve configured GraphQL.

### Configure GraphQL

The Craft CMS GraphQL API requires Craft Pro. You can upgrade your local install instantly to use a trial of Craft Pro you can use as long as you’d like.

First upgrade your Craft Solo edition to Craft Pro:

1. From the control panel, choose the “Solo” badge in the bottom left corner.
2. In the “Pro” panel, choose “Try for free”.

<BrowserShot url="https://localhost:8080/admin/plugin-store/upgrade-craft" :link="false" caption="Upgrading from Solo to Pro.">
<img src="../../images/tutorial-upgrade-pro.png" alt="Screenshot of plugin store upgrading to Craft Pro trial" />
</BrowserShot>

Your edition will be upgraded and you’ll see a new GraphQL item in the navigation menu. Choose that.

This is the GraphiQL explorer where you can see the API documentation and run queries directly in the browser:

<BrowserShot url="https://localhost:8080/admin/graphql" :link="false" caption="The GraphiQL explorer.">
<img src="../../images/tutorial-graphql.png" alt="Screenshot of GraphiQL" />
</BrowserShot>

Try running a test GraphQL query:

```graphql
{ ping }
```

You’ll see `pong` in the response signaling that everything’s ready to go:

<BrowserShot url="https://localhost:8080/admin/graphql?query=%7B%20ping%20%7D%0A" :link="false" caption="It’s working!">
<img src="../../images/tutorial-graphql-ping.png" alt="Screenshot of GraphiQL with simple query and response" />
</BrowserShot>

TODO: headless configuration

### Query content

TODO: querying Entries, Globals, and Assets

```graphql
{
  entries(section: ["blog"]) {
    title
  }
}
```

```graphql
{
  entries(section: ["about"]) {
    title
  }
}
```

```
{
  globalSet(handle: ["siteInformation"]) {
    ... on siteInformation_GlobalSet {
      siteDescription
    }
  }
}
```
