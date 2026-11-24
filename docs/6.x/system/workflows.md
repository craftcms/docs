# Workflows

Workflows protect your live content by requiring that drafts satisfy a set of conditions, before they’re applied.

::: tip
Workflows are currently a feature of Craft <Badge type="edition" text="Pro" />.
:::

<!-- more -->

Create a workflow by visiting <Journey path="Settings, Workflows" /> and pressing **New workflow**.

## Stages

A workflow is made up of one or more _stages_, which execute one at a time, top to bottom.
Craft comes with a single built-in stage type, **User Review**.

::: tip
Plugins can add stage types using the `CraftCms\Cms\Workflow\WorkflowStageTypes` [registry](../extend/registries.md).
:::

### User Review

The **User Review** stage type holds a draft for review until the required number of “approvals” have been logged.
It requires two settings:

- **Reviewer Groups** — Which user groups can approve changes?
- **Approvals Required** — Choose the number of individual users who must approve changes, _in total_ or _per selected group_.

When a User Review stage runs, eligible users (those in one of the **Reviewer Groups** who also have access to the element) are sent a [control panel notification](control-panel.md)

## Workflow Lifecycle

Users will typically encounter workflows on an element edit screen—natively, only [entries](../reference/element-types/entries.md) have built-in workflow support.

In sections with a configured workflow, a **Workflow** tab is available in the details sidebar.
The primary form’s **Request review** button (which replaces the standard **Create entry** or **Save** action) opens this pane, where you can initiate the workflow by pressing **Submit for review**.
Any comment text you provide when submitting for review (or via the **Activity** feed) will be visible to reviewers.

Craft notifies potential reviewers, and moves the draft into read-only mode.
You may withdraw a draft from review by pressing **Start editing** in the banner in the footer.

### Reviewers

Not every user that receives a review request is required to act!
Design your workflows to suit the structure of your content team—notifications should be relevant and actionable to their recipients.
This might mean creating additional user groups so that the scope of those notifications is as narrow as possible.

When a reviewer clicks a notification, they are taken to the entry’s edit screen, with the **Workflow** tab open.
They can review the changes, and take one of three actions:

- **Comment** — Submit a text comment about the changes. They may do this any number of times, until the review ends.
- **Approve** — Record their approval, with an optional comment. Approvals cannot be rescinded, except by an [administrator](#admin) restarting the workflow.
- **Request changes** — Describe additional changes that are required before they will approve. When a reviewer takes this action, the workflow is immediately failed.

User review can go back and forth as many times as necessary; the owner of a draft can also withdraw it and resubmit.

### Admin

Administrators have two special capabilities, during review:

- **Override approval** — Skip any pending reviews, and force the workflow to continue. A special **Activity** event is added to document the override.
- **Restart workflow** — Abandon the current workflow state and start from the beginning. Prior runs are preserved in the **Activity** tab, but their results are not considered in the new run.

## Applying Workflows

To use a workflow, select it from a [section](../reference/element-types/entries.md#sections)’s edit screen.
