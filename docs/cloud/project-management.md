# Managing Projects

Craft Cloud projects are always created via [Craft Console](kb:what-is-craft-console). You can start projects with your [personal account](kb:craft-console-organizations#individual-private-accounts), or within an [organization](kb:craft-console-organizations#organizations).

We generally recommend organizations for Cloud projects, as they support delegated access and other features that underpin safe collaboration.

## Creating a Project

Log in to your Craft Console account, then click **Cloud** in the main navigation. If this is your first project, you’ll see a welcome screen and a **New project** button; existing Cloud users will see a list of current projects.

Use the menu in the upper-right corner to switch between your personal account and the organizations you are a member of. You must have a [payment method](kb:craft-console-organizations#managing-payment-information) on file (in the current account context) to start a Cloud trial.

Within an organization, only owners and administrators can create projects. If you don’t have adequate permissions, get in touch with the person who created the organization.

## Project Ownership + Collaboration

Projects owned by a personal account can only be managed via that account. **You cannot transfer a project to an organization after it is created.**

If you suspect that a project will ever be supported by someone other than you, create an organization for it. Organizations are free, and provide a perfect place to consolidate a client or firm’s projects and licenses.

::: warning
The Craft Console users who can access your project are not associated with the users in your Craft site, and vice-versa. It’s important to be aware, though, that anyone with access to your Cloud project can get access to its database and run commands that alter Craft users’ permissions.
:::

Projects are billed to the primary payment method on file for the personal account or organization that owns it.

### Inviting a User

Read about [inviting users](kb:craft-console-organizations#inviting-members-to-an-organization) in our Using Organizations article.

## Connecting a Repository

When creating a project, you will be asked to connect to a Git provider.

This connection is established for your *personal* account, even if the project will be owned by an organization. Cloud interacts with the provider on behalf of anyone managing the project, after the authorization is granted.

Whoever sets up a project must have the correct permissions at the provider (and grant access to any additional scopes) when establishing the connection.

Follow [this guide](troubleshooting.md) if you need to reauthorize a provider.
