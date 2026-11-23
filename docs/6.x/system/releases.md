# Content Releases

As your site grows, you may want to publish bundles of related changes, all at once.

<!-- more -->

Craft solves this with _content releases_, alongside its powerful [drafting](drafts-revisions.md) and [workflow](workflows.md) systems.

A release is, at its core, a group of drafts with a name.
When a release is _Published_ (manually, or after being _Scheduled_), its drafts are applied to their canonical elements in one big database transaction, making it an “atomic” operation.
If there are issues with one of the drafts, the entire release is rolled back and you have an opportunity to correct them.

Drafts awaiting input as part of a [workflow](workflows.md) can be added to a release, but they will be marked as **Blocked** and the release will not force-publish them.

## Statuses

Releases go through a few different stages:

- **Draft** — The initial state for a release; you may add drafts, edit metadata, and publish or schedule it as you wish.
- **Scheduled** — The release has a publication date in the future. It can be _unscheduled_ to stop automatic publishing.
- **Publishing** — Craft is currently applying the releases’s drafts. You will not likely see this status in the control panel, except for extremely large releases.
- **Published** — Drafts were successfully applied. At this point, the release becomes read-only and is retained for reference only.
- **Failed** — Something went wrong while applying drafts, so the release was rolled back. Failed releases are not retried; they require manual input to publish.

Each draft in a release is also labeled with a status:

- **Ready** — The draft is ready to be applied.
- **Ready with warnings** — Potential issues have been identified with the draft. Refer to the **Issues** column for details. Examples of this include…
  - There are unmerged changes from the canonical element;
  - The draft’s **Post date** or **Expiry date** would prevent changes from being visible in the front-end;
  - Related elements the draft points to are not included in the release;
- **Blocked** — The draft has gone missing, or it is blocked by a workflow.
- **Published at…** — For published releases, drafts show the date they were applied.

Releases can only be published when all their drafts are **Ready**, or **Ready with warnings**.

## Permissions

Users must have the **Manage releases** [permission](user-management.md) permission to create releases and add drafts to them.
The **Publish releases** permission allows users to schedule or publish a release.

::: warning
A user does _not_ need to have the **Save entries** permission for every entry in a release in order to publish it.
:::
