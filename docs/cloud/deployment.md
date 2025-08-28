# Deployment

When you [trigger a deployment](#deployment-triggers) (by pushing code or manually starting one from Craft Console), Craft Cloud is actually doing three things, in sequence:

1. [Build](#1-build-step)
2. [Migrate](#2-migrations)
3. [Release/Deploy](#3-deployment)

This process reflects our general [deployment and workflow recommendations](/docs/5.x/deploy.html) laid out in the documentation—but it’s all handled for you!

You can review an [environment](environments.md)’s deployment history (and the status of any active deployments) by navigating to its **Deployments** screen.

### Deployment Triggers

Each environment in Cloud defines its own **Deploy Trigger**, which determines when it is deployed. You may select from:

- **On Push:** Deploys whenever a new commit is pushed to the selected **Branch**, or someone with access to your Cloud project manually starts one (see below).
- **Manual:** Deploys are only started manually, from Craft Console.

**On Push** is a great option for teams with a well-defined Git flow that ensures only production-ready changes are committed or merged into the selected branch.

## 1. Build Step

The first thing Cloud does is assemble PHP and Node dependencies, and package them into a new function. This process is described in greater detail in our [Build Process and Artifacts](builds.md) article.

If your project uses Node (or has unique PHP requirements), we strongly recommend familiarizing yourself with this stage of the deployment!

## 2. Migrations

On your new function, Cloud executes `php craft cloud/up` (a special version of `php craft up`), which applies project config changes and database migrations, and publishes all asset bundles. This must complete successfully for the deployment to continue—if a migration fails, the last-deployed version of your project will continue to serve requests.

A record of this command (and its output) is added to the **Commands** section in that environment.

## 3. Deployment

When Cloud determines that the previous two steps have run without issue, it will begin serving requests from the newly-built functions.

You can observe the progress of a deployment from the **Deployments** screen of each environment. There are no limits to the number of times you deploy each month, or the total “build minutes” for those deployments—but each deployment must complete within 15 minutes.
