# Front End Options

Now that we’ve modeled our blog’s content in the Craft CMS control panel, it’s time to build a front end to display content for visitors.

Craft CMS supports two distinctly different ways of building a front end:

1. Monolithic: building Twig templates for server-generated pages.
2. Headless: using a GraphQL or JSON API in conjunction with a separate front end codebase.

::: tip
Craft is a hybrid CMS, meaning you can combine monolithic and headless features to suit your project—or even just for learning.
:::

If you’ve never built a website using either one, choosing is a matter of picking whatever you’re most comfortable with or interested in.

Twig templates are like plain HTML with superpowers. They live in the Craft CMS project code you’ve already set up, and they’re easiest to start with if you want to get coding right now.

If you’re familiar with JavaScript and have built a site using [Gatsby](https://www.gatsbyjs.org/) or [Gridsome](https://gridsome.org/) before, relying on Craft’s GraphQL API might be easier. You can spin up your front end project however you normally would, then configure Craft to make its content available.

::: tip
[Craft Pro](https://craftcms.com/pricing) is required to use the GraphQL API. You can try Craft Pro locally without any time limit, but you’ll need to upgrade your license if you use it in production.
:::
