# Upgrading from Craft 3

The first step to upgrading your site to Craft 4 is updating the CMS itself.

## Preparing for the Upgrade

Before you begin, make sure that:

- you’ve reviewed the changes in Craft 4 further down this page
- your server meets Craft 4’s [minimum requirements](requirements.md) (Craft 4 requires PHP 8.0+ and at least 256 MB of memory allocated to PHP)
- your site is running at least **Craft 2.6.2788**
- your plugins are all up-to-date, and you’ve verified that they’ve been updated for Craft 4 (you can see a report of your plugins’ Craft 4 compatibility status from the Updates page in the Craft 3 control panel)
- your **database is backed up** in case everything goes horribly wrong

Once you've completed everything listed above you can continue with the upgrade process.

## Performing the Upgrade

The best way to upgrade a Craft 3 site is to approach it like you’re building a new Craft 4 site. So to begin, create a new directory alongside your current project, and follow steps 1-3 in the [installation instructions](installation.md).

With Craft 4 downloaded and prepped, follow these steps to complete the upgrade:

1. Configure the `.env` file in your new project with your database connection settings from your old `craft/config/db.php` file.

   ::: tip
   Don’t forget to set `DB_TABLE_PREFIX="craft"` if that’s what your database tables are prefixed with.
   :::

2. Copy any settings from your old `craft/config/general.php` file into your new project’s `config/general.php` file.

3. Copy your old `craft/config/license.key` file into your new project’s `config/` folder.

4. Copy your old custom Redactor config files from `craft/config/redactor/` over to your new project’s `config/redactor/` directory.

5. Copy your old custom login page logo and site icon files from `craft/storage/rebrand/` over to your new project’s `storage/rebrand/` directory.

6. Copy your old user photos from `craft/storage/userphotos/` over to your new project’s `storage/userphotos/` directory.

7. Copy your old templates from `craft/templates/` over to your new project’s `templates/` directory.

8. If you had made any changes to your `public/index.php` file, copy them to your new project’s `web/index.php` file.

9. Copy any other files in your old `public/` directory into your new project’s `web/` directory.

10. Update your web server to point to your new project’s `web/` directory.

11. Point your browser to your control panel URL (e.g. `http://my-project.test/admin`). If you see the update prompt, you did everything right! Go ahead and click “Finish up” to update your database.

12. If you had any plugins installed, you’ll need to install their Craft 3 counterparts from the “Plugin Store” section in the control panel. (See the plugins’ documentation for any additional upgrade instructions.)

Now that you’ve upgraded your install to use Craft 4, please take some time to review the changes on this page and update your project to follow the changes in Craft 4.

### Troubleshooting

## Configuration

### Config Settings

Some general config settings have been renamed in Craft 4. The old setting names have been deprecated, but will continue to work until Craft 5.

| Old Setting                  | New Setting
| ---------------------------- | -----------------------------
| |

Some config settings have been removed entirely:

| File          | Setting
| ------------- | -----------
| |

## PHP Constants

Some PHP constants have been deprecated in Craft 4, and will no longer work in Craft 5:

| Old PHP Constant | What to do instead
| ---------------- | ----------------------------------------
| |

## Template Tags

Some Twig template tags have been deprecated in Craft 4, and will be completely removed in Craft 5:

| Old Tag                         | What to do instead
| ------------------------------- | ---------------------------------------------
| |

## Template Functions

Some template functions have been removed completely:

| Old Template Function                       | What to do instead
| ------------------------------------------- | ------------------------------------
| |

Some template functions have been deprecated in Craft 4, and will be completely removed in Craft 5:

| Old Template Function                                   | What to do instead
| ------------------------------------------------------- | ---------------------------------------------
| |

## Element Queries

### Query Params

Some element query params have been removed:

| Element Type | Old Param          | What to do instead
| ------------ | ------------------ | -------------------------
| |

Some element query params have been renamed in Craft 4. The old params have been deprecated, but will continue to work until Craft 5.

| Element Type | Old Param                | New Param
| ------------ | ------------------------ | ----------------------------
| |

### Query Methods

Some element query methods have been renamed in Craft 4. The old methods have been deprecated, but will continue to work until Craft 5.

| Old Method      | New Method
| --------------- | --------------------------------------------------------
| |

## Elements

## Request Params

Some controller actions have been renamed:

| Old Controller Action       | New Controller Action
| --------------------------- | --------------------------
| |

Some `redirect` param tokens have been renamed:

| Controller Action               | Old Token     | New Token
| ------------------------------- | ------------- | ---------
| |

## Plugins

See [Updating Plugins for Craft 4](extend/updating-plugins.md).
