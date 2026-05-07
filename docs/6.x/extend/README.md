# Prologue

Laravel brings a fundamental shift in Craft’s relationship with a project, but plugin architecture remains largely the same.
Your plugin still has a single primary entry-point, registers features with Craft, defines HTTP and CLI APIs, and so on…

Up to this point, Craft *was* the application—an extended instance of Yii, that owned the entire request lifecycle and acted as the “kernel” of the app.
Now, Craft is a *tenant* within a Laravel project, as are plugins.

At a high level, Craft is one of many _service providers_ that Laravel can discover.
We then expose a management and initialization layer that plugins use to register additional features.
The hierarchy is comparatively flat, though: as Laravel packages, plugins have virtually the same capabilities as Craft itself!

Plugins aren’t the *only* way to extend Craft.
Since Craft 3.x, many developers have used _modules_ to add functionality to individual projects or share it semi-privately between many.
You are still free to bundle this kind of extension into a package, or keep it as part of a single application.

We are excited to share Craft’s new architecture and introduce plugin developers to Laravel conventions, within familiar territory.
When you have questions about organization, best practices, style, or new language features, we invite you to dive into Craft’s source (as you have in the past), or reach directly for the expansive Laravel documentation.

The rest of this section covers common extension points from the perspective of existing Craft developers.

Ready?
Let’s do it.
