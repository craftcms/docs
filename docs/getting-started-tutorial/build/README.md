# Front-End Basics

Now that we’ve set up enough tools to manage a pool of content, it’s time to build a “front-end” presentation for visitors.

This process involves three concepts:

1. Craft’s request and response lifecycle;
1. Querying content created via the admin;
1. Interspersing that content with HTML (and styling the output with CSS);

Craft supports two fundamentally different approaches to building a front-end:

1. **Monolithic:** Using templates to generate HTML on the server;
1. **Headless:** Using GraphQL in conjunction with a separate front-end view library;

::: tip
Both methods give you complete access to your content. You are free to choose one of these approaches, combine aspects that suit your project, switch between them at a later date, deploy both for different audiences, or come up with your own hybrid architecture!

Craft doesn’t dictate anything about how you consume your content—in fact, it can be used as a back-end for a native application or kiosk, a bare API… or have no front-end at all.
:::

This tutorial will focus on a “monolithic” architecture, due to its lack of external dependencies—however, we will touch on the [GraphQL API](../more/graphql.md) in the _More_ section.

We’ll start by fixing the “404 Not Found” error we faced after creating our first blog post.
