# Rebrand Assets

Craft allows you to customize the control panel and login screens by providing a **Site Icon** and **Login Page Logo** via <Journey path="Settings, General" />.

However, these artifacts are _not_ stored in Craft’s asset system—instead, they’re kept on-disk in your project’s “rebrand” directory. By default, that path is dependent on [`CRAFT_STORAGE_PATH`](/5.x/system/directory-structure.md#storage), but can be set directly using the [`CRAFT_REBRAND_PATH`](/5.x/reference/config/bootstrap.md#craft-rebrand-path) bootstrap variable.

Any image file in an `icon/` or `logo/` subdirectory of your rebrand path will be used for the **Site Icon** and **Login Page Logo**, respectively—the existence of the file is enough for Craft to discover and display them.

On Craft Cloud, we recommend explicitly setting `CRAFT_REBRAND_PATH` to a path within your project…

![Screenshot of a “CRAFT_REBRAND_PATH” variable being added via the “Variables” screen of a Craft Cloud project.](./images/cloud-rebrand-env-var.png)

…then making sure that path is tracked in your git repository. Rebrand assets must be present when your project is deployed, and they cannot be uploaded to the control panel.

If you use `@root/storage/rebrand` (and based your project on our `craftcms/craft` [starter project](/knowledge-base/using-the-starter-project)), you don’t need to do anything else for Craft to pick up the icons—the `storage/rebrand/` folder is [already tracked](https://github.com/craftcms/craft/blob/5.x/storage/.gitignore) and will be available in the image we build and deploy.

Otherwise, you may need to relocate your assets so they agree with this path. Test your configuration locally by setting `CRAFT_REBRAND_PATH` in your `.env` file!

::: tip
Prefix the path with `@root` to ensure it’s within your project directory.
:::

After changing one or more environment variables, Console will remind you to start a [deployment](deployment.md) to apply the configuration.
