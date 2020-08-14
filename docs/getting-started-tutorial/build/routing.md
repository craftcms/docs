# Dynamic routing :sparkles:

Every web server has the straightforward job of translating a URL into a response. This job is called _routing_.

## Static routes

At this very moment, you can add a cat photo to your project at `web/cat.jpg` and see it in your browser at `http://tutorial.test/cat.jpg`. The web server reads that URL, finds the file in the web root, and gives it back in a response the browser displays. This is a _static_ route where Craft CMS never gets involved; normal web server stuff.

![](../images/tutorial-web-root.png)

## Dynamic routes

When we build a template-driven CMS website, the CMS is responsible for handling _dynamic_ routes. If the web server doesn’t find a static route in our case, it hands off to Craft CMS which then looks at [a series of things](/3.x/routing.md) to see if it can return a response. (If not, it returns a 404.)

![](../images/tutorial-dynamic-request.png)

As we add content in the control panel, we’re expanding a map of dynamic routes. We’ve used Craft CMS, for example, to create a _Blog_ section that uses the URL format `blog/{slug}` for its posts. `{slug}` is a special placeholder that stands for any published entry’s _Slug_ value. When the URL maps to an entry, our settings also say it should be displayed on a `blog/_entry` template we haven’t created yet.

You don’t need to know this to start working with templates, but it may help to know what role they play and why they’re different from static files.