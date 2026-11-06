# AI + Agents

Craft’s AI tools are entirely opt-in, and are provider-agnostic.
[Tasks](#tasks) and [connections](#connections) give you control over what a project can do with AI, and what models it communicates with.

<!-- more -->

::: tip
This page describes how Craft can use _AI_.
To learn about how AI can use _Craft_, check out the [MCP](mcp.md) page.
:::

<Block label="Principles">

Our implementation of AI features is guided by three core principles:

1. **Opt-in.** Action is required to enable new features, for each project.
1. **LLM-agnostic.** Use of Craft will never favor a specific provider, and will always work without one.
1. **No profiteering.** We will never use your content, code, or activity to train models.

It’s important to be aware that our policies don’t govern the behavior of your chosen provider(s).
Content that your users share with a model is subject to its usage agreement.

</Block>

## Tasks

Tasks define what kinds of things the system can do with the help of AI.

Craft has a number of built-in tasks, which can be supplemented by plugins:

- **AI assistant** — Enables the global “Ask AI” helper, using the site’s [MCP](mcp.md).
- **Generate chat titles** — Automatically label your “Ask AI” conversations. (Chat still functions without this.)
- **Generate alt text** — Pre-fill assets’ `alt` field with a description.
- **Generate titles** — Replace generic asset titles with succinct names. (Craft will always attempt to extract helpful titles from image metadata, without AI.)
- **Detect focal points** — Choose a default focal point when an asset is uploaded.
- **Tag images** — Generate up to 20 keywords that describe the image.
- **Classify images** — Tag an image as a `photo`, `illustration`, `screenshot`, `diagram`, `logo`, `document`, or `pattern`.

::: tip
The full instructions sent with vision tasks are available on each implementation of `CraftCms\Cms\Asset\Analysis\ImageAnalysisTask`.
:::

## Connections

Inference providers are configured in the [Laravel AI SDK](laravel:ai-sdk#configuration)’s `config/ai.php` file.

<Todo notes="What is the practical difference between a modality and capability?" />

Visit <Journey path="Settings, Connections" /> to select a default provider and model for each of the capabilities (or _modalities_) that the registered [tasks](#tasks) require.
You can override the defaults on a per-task basis, to optimize for reliability or cost.

::: tip
Some providers and models may not support all tasks or modalities.
Always verify that your enabled tasks are completed satisfactorily.
:::

## Guidance + Skills

Site-wide instructions for AI tasks can be added in <Journey path="Utilities, AI Guidance & Skills" />.
Multi-site projects will display a global **All sites** field, then fields for each site.

This is also where **Skills** can be added for common tasks.
Skills are global, but can be invoked in a chat session as slash-commands (`/Some Skill`).

::: danger
Any user with access to the **AI Guidance & Skills** utility can add instructions that are then injected into other users’ sessions.
This can result in an agent calling tools that are otherwise inaccessible to the attacker.
:::
