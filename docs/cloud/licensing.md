# Licensing

Your Craft Cloud <Badge type="edition" vertical="baseline">Pro</Badge> or <Badge type="edition" vertical="baseline">Team</Badge> plan includes a [license](/5.x/editions.md) to run the corresponding version of Craft.

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
