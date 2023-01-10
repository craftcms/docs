---
description: Recommendations for hosting and deploying a Craft application
---

# Hosting & Deployment

Craft’s [installation](./installation.md) process differs from many other PHP-based CMS products. We start with a local development environment to emphasize the value of a defined workflow—whatever it may be—to the reliability and longevity of a website.

In more ways than not, our recommendations for hosting and deploying a Craft website end up describing collaboration between teammates. Sharing code and content with others will involve most of the same 

Let’s look at how to apply these principles and set up stress-free deployments.

## Workflow Advice

### Source Control

No matter how you work—or who you work with—the single most important thing to do when working with code is to frequently check it in to [version control](https://www.atlassian.com/git/tutorials/what-is-version-control). Having regular checkpoints and backups can mitigate all kinds of unexpected losses and regressions.

A centralized repository for your code (on Github, Gitlab, BitBucket, or elsewhere) also means that getting new code onto a server is dramatically simplified.

### Versions + Project Config



## Selecting a Host

Craft will work on virtually any hosting platform that meets its [requirements](./requirements.md), but choosing one that matches your expectations for performance and reliability is key.

::: tip
Check out our list of [hosting partners](https://craftcms.com/hosting), and the [introduction to hosting](kb:hosting-craft-101) Knowledge Base article if this is your first time launching a Craft project.
:::

### Recommendations

- Choose a host that offers dedicated resources. This is sometimes referred to as a “virtual private server,” and will often include specific system information when selecting a service plan, like the number of CPU cores, RAM, and disk space allocated to your project.
- For unmanaged hosting, consider using a provisioning tool like [Laravel Forge](https://forge.laravel.com/), [ServerPilot](https://serverpilot.io/), or [Ploi](https://ploi.io/).

### Red Flags

- “Shared” hosting may be the most affordable option, but 
- Lack of SSH access (or FTP-only hosts) means you will be unable to run [console commands](./console-commands.md), and significantly limits your [deployment](#deployment) options.

## Deployment

The variety of requirements

## Common Pitfalls

Sometimes, bad things do happen—despite all our preparation. Here are some common issues you might encounter when working with a hosted Craft site.

### Backups

Draft a recovery plan and regularly test backups to ensure it is actionable.

::: warning
Backups that exist only on the machine that is being backed up aren’t really backups! Make sure backups that are part of your recovery plan are copied to at least one other off-site location.
:::

### Be Aware of Artifacts

Not everything that comprises a Craft site is (or should be) tracked in version control:

- Assets uploaded to a local [filesystem](./assets.md#filesystems) via the [control panel](./control-panel.md);
- Database backups (stored in [`storage/backups/`](./directory-structure.md#storage));
- Secrets (usually [relegated to `.env`](./config/README.md#env));
- Caches and other temporary files;

::: tip
See the official [starter project](repo:craftcms/craft)’s `.gitignore` file for a more complete list of files we recommend excluding from version control.
:::

When introducing new code onto your server, consider which of the above files should be kept in place and which can be discarded. Fully replacing your web root or project folder is rarely the right move: you shouldn’t be required to rebuild configuration or copy files back in after deploying new code, and your client’s assets should never be deleted or overwritten.

Similarly, if you are using Git directly on a server to pull new code in, how do you reconcile unforeseen changes that happen on-disk?

### Precision + Judgement

Avoid deployment processes that involve timing, decision-making, manual intervention, or other non-automated steps.
