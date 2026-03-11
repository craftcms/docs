---
description: Learn about how licensing works, on Cloud.
---

# Licensing

Every Craft Cloud <Badge type="edition" vertical="baseline">Pro</Badge> or <Badge type="edition" vertical="baseline">Team</Badge> plan includes a [license](/5.x/editions.md) to run the corresponding version of Craft.

<!-- more -->

Your license is valid as long as your Cloud project is active, and includes the same [support](#support) as a self-hosted installation.
There is nothing to manage or renew, and the [license lifecycle](kb:how-craft-license-enforcement-works) remains effectively the same:

- Your development environment is issued a key the first time it [phones home](kb:how-craft-license-enforcement-works#phoning-home);
- Plugins you install while working on the site have their trial licenses tied to that key;
- When you eventually [go live](launch-checklist.md) on Cloud, your plugin licenses are annotated with the Cloud project;

Administrators will only see a [license resolution banner](kb:how-craft-license-enforcement-works#notices) in public environments, when there is an issue with a plugin.
While running on Cloud, preexisting keys (stored in `config/license.key` or in the `CRAFT_LICENSE_KEY` environment variable) are ignored; instead, we validate the installation using your project’s internal ID.
Even though the key file is not used for verifying the Craft license, we recommend keeping it with the project, so that its plugin licenses remain connected.

## Changing Editions

If you need to switch editions, please <Email :address="$activeSetVars.supportEmail" text="contact the support team" />.

After your plan has been adjusted, make the corresponding edition change in a local environment, commit the [project config](/5.x/system/project-config.md) changes, and [redeploy](deployment.md) each of the project’s environments.

It is possible to deploy a project with mismatched editions, but the `cloud/up` command will return an error.

## Plugins

Cloud does _not_ cover first- or third-party plugin licenses.
You are still responsible for purchasing any commercial plugins when your project goes live.

The first time an [admin](/5.x/system/user-management.md#admin-accounts) logs in to the control panel from a [public domain](kb:how-craft-license-enforcement-works#public-domains), they should see a prompt to resolve any outstanding licensing issues.
If not, use the <Journey path="Utilities, Clear Caches" /> screen to clear all caches, log out, and log in again.

## Development

Craft is free to evaluate during development, and in staging environments (on _or_ off Cloud).
You do not need an active Cloud subscription to begin development, but we recommend [starting a seven-day trial](https://console.craftcms.com) to get familiar with the platform.

## Existing Licenses

If you are [migrating a project](migrating.md) to Cloud that was already licensed, your Craft and plugin licenses will remain connected.

To reuse the Craft license on another project, you should first eject any associated plugin licenses by [releasing and re-claiming](kb:releasing-and-claiming-licenses) them.
You may then re-associate them with a “trial” license in development, or allow them to float within the project’s Console user or organization.

## Support

When [contacting support](faq.md#get-support) about Craft issues, please include your Cloud project’s handle and/or domain.
This will allow us to look up information about your environment and the version of Craft (and any plugins) you are using.
