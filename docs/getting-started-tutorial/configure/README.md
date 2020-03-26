# 2. Build Your Content

You now officially have a working local Craft CMS install!

In this section we’ll learn what to do with it:

1. Take quick tour of the control panel.
2. Configure and edit our blog content.
3. Build dynamic front end templates or work with the GraphQL API.

## Control panel tour

The control panel may seem a bit empty—that’s a feature, not bug! Craft doesn’t tell you how to structure your content, it provides a blank slate you can use to build however you’d like.

<BrowserShot url="https://localhost:8080/admin/dashboard" :link="false" caption="The control panel without any content.">
<img src="../../images/tutorial-empty-control-panel.png" alt="Screenshot of the Craft CMS control panel Dashboard" />
</BrowserShot>

The place you landed is the Dashboard, which you can customize with various widgets. By default, we’ll see the Recent Entries we haven’t created yet, recent Craft News, Support and Feedback options, and a notice about whether any software updates are available.

In the upper right corner you can choose the profile circle to edit your account details or log out.

In the opposite lower left corner, you’ll see your Craft edition (Solo) and current version number. If you’re the explore-ahead type, you can click that edition badge to switch to a trial of Craft Pro. It doesn’t expire and it won’t hurt anything, but that’s not what we’re doing right now.

To the left, then, is the sidebar navigation. (You may have to use the hamburger icon to expand the navigation if you’re working with a narrow-ish browser window.) Choose Utilities.

<BrowserShot url="https://localhost:8080/admin/utilities/system-report" :link="false" caption="The System Report utility lists important details about your installation.">
<img src="../../images/tutorial-utilities.png" alt="Screenshot of the Craft CMS utilities section" />
</BrowserShot>

You probably won’t need to visit Utilies too often, but it has some helpful tools.

By default you’ll land on the System Report. These are key details about your Craft install, and while we’re here it’s a good idea to make sure that each of the items under “Requirements” has a green check mark next to it.

<BrowserShot url="https://localhost:8080/admin/utilities/system-report" :link="false" caption="Installed with flying colors.">
<img src="../../images/tutorial-system-requirements.png" alt="Screenshot of the System Report’s Requirements list with all green checkmarks" />
</BrowserShot>

If any line does not have a green check mark, choose the “i” icon to see more information and whether it’s something you’re able to fix.

We won’t be using these utilities in this tutorial, but it might be good to know what they do:

- **Updates** will list software updates that are available for Craft CMS and any installed plugins.
- **PHP Info** lists exhaustive details about your environment’s PHP configuration that can be useful for troubleshooting.
- The **Queue Manager** lets you peek under the hood of the system Craft uses to run batches of small jobs. Things will show up and disappear themselves as jobs are queued up and completed.
- **Clear Caches** lets you select and clear types of temporary stored data Craft uses to stay fast.
- **Deprecation Warnings** will detail any outdated code you might be using, where to find it, and usually what to replace it with.
- **Database Backup** lets you easily make and optionally download a copy of your database.
- **Find and Replace** is a powerful tool you can use to find and replace text in your database.
- **Migrations** will list and run PHP instructions you write for programmatically changing stuff.

### Plugin Store

Craft’s built-in plugin offers free and paid plugins that can add functionality to your Craft CMS website.

<BrowserShot url="https://localhost:8080/admin/plugin-store" :link="false" caption="The Craft CMS Plugin Store.">
<img src="../../images/tutorial-plugin-store.png" alt="Screenshot of Plugin Store" />
</BrowserShot>

## Content in Craft CMS

The process of deciding what shape your content should take is referred to as “content modeling.” Once you’re familiar with Craft’s building blocks, it can be liberating and even fun to decide how you’ll use them to bring your project to life.

### Get familiar with content modeling in Craft

Let’s take a quick look at the key building blocks and then use them to set up our blog.

<img src="../../images/icons/sections-entries.svg" width="48" style="margin-bottom: 0; position: relative; top: 1rem;">

#### Sections & Entries

Sections are often where most of your content may live. A section is a collection of similar types of content, like a blog post, press release, or job listing. Each section is meant to have many Entries that each follow a specific URL pattern and use whatever set of custom input fields you decide it should have.

A job listing section, for example, might have fields for skill requirements, location and salary range. A blog post probably won’t need any of those, but certainly a post body, imagery, and categories or tags.

<img src="../../images/icons/structures.svg" width="48" style="margin-bottom: 0; position: relative; top: 1rem;">

#### Structures

A normal Section will have Entries that are ordered by date. A Structure is a special kind of Section where Entries can be dragged and dropped into a fixed hierarchy that’s more useful for products and services, case studies, or content that’s meant to be presented in a very specific way.

<img src="../../images/icons/singles.svg" width="42" style="margin-bottom: 0; position: relative; top: 1rem;">

#### Singles

Singles are for one-off pages. Technically Singles are a type of Section that only has one page. These can be useful for something like your About page, which won’t have multiple Entries but may still require its own Field Layout.

<img src="../../images/icons/globals.svg" width="46" style="margin-bottom: 0; position: relative; top: 1rem;">

#### Globals

Sometimes you’ll need to manage content that isn’t used on any single page, but shared by one or more pages on your site. This is what Globals are for. Globals are groupings of field sets, similar to Entry Types, that can be accessed globally, or throughout your site’s code. Common examples of globals might be a company name and address, office hours, or social media profile links.

<img src="../../images/icons/assets.svg" width="46" style="margin-bottom: 0; position: relative; top: 1rem;">

#### Assets

Assets are files that are managed by Craft CMS. They’re stored in Asset Volumes, which you can think of like folders, and each Asset Volume can have its own Field Layout just like an Entry.

Craft CMS includes powerful tools for editing images and setting their focal points right in your browser, along with convenient tools for dynamically cropping and sizing them in your templates.

<img src="../../images/icons/entry-types.svg" width="42" style="margin-bottom: 0; position: relative; top: 1rem;">

#### Entry Types

Craft uses the term Entry Type to define the set of input fields that belongs to a Section. Every Section has at least one Entry Type or set of fields. You can, however, add as many Entry Types as you’d like for each Section. This isn’t common, but it can be useful when your content may regularly take one of several forms. A job posting, for example, might typically be related to a specific office location in a _Local_ Entry Type, but also sometimes need to be a remote position (_Remote_ Entry Type) related to a specific timezone or set of countries.

<img src="../../images/icons/fields.svg" width="46" style="margin-bottom: 0; position: relative; top: 1rem;">

#### Fields

Each Entry Type is made up of whatever Fields you decide to add.

By default, every Entry will have a Title, Post Date, Expiration Date, and a Slug if its Section has public URLs.

You’ll use Field Layouts to add and arrange as many Field Types as you need, in any number of tabs. Craft comes with powerful Field Types out of the box:

<FieldTypeGrid />

::: tip
These are the fields that ship with Craft CMS; many more are available [in the plugin store](https://plugins.craftcms.com/categories/fields).
:::

## Create the blog section

The first thing we’ll do is create a new Section for our blog posts.

1. In the control panel, choose “Settings” from the main navigation.
2. Choose “Sections” from the “Content” options.
3. Choose “+ New section”.
4. Enter “Blog” for this new section’s name. Notice that the lowercase handle and Entry URI Format are created for you. The handle is what you’ll use to refer to the section in your templates and GraphQL queries, and the URI is where you’ll eventually see your blog post on the front end.
5. Enter `blog/_entry` for the “Template” setting. We’ll create that template later on.
6. Leave the rest of the default settings as they are and choose “Save”.

<BrowserShot url="https://localhost:8080/admin/settings/sections/new" :link="false" caption="Settings for the new blog section.">
<img src="../../images/tutorial-new-section.png" alt="Screenshot of new section fields" />
</BrowserShot>

You’ll see a new “Entries” menu item in the control panel navigation. Choose that item and select “New Entry” → “Blog”.

Technically we could create a new blog post now, but all we would have is a “Title” field.

<BrowserShot url="https://localhost:8080/entries/blog6?draftId=5&fresh=1" :link="false" caption="The new blog post entry doesn’t yet have any fields.">
<img src="../../images/tutorial-empty-new-entry.png" alt="Screenshot of new blog post entry with only a title" />
</BrowserShot>

Let’s create some fields to store blog post content!

### Create blog fields

Now we’ll create some fields for storing content and add them to the blog entry type’s field layout.

Here’s what we’ll set up for our blog posts:

- A Volume for storing images used for post content.
- A Plain Text field to be used for a post summary.
- An Assets field for a feature image.
- A Categories field for post taxonomy.
- A Matrix field for flexible post content.

#### Create an Asset Volume

First, let’s create a place to upload the files we’ll use for our feature and post images.

Craft uses the concept of Assets to describe uploaded files. Assets consist of the files themselves and any other fields we’d like to attach to them. All Assets are stored in folders referred to as Volumes. These can be in your filesystem or different cloud storage providers—see the documentation on [Volumes](https://docs.craftcms.com/v3/assets.html#volumes) for more about those options.

Create a local Asset Volume for storing blog post images:

1. In your local filesystem, find Craft’s `web/` folder and create a new folder inside that called `assets`. Inside that folder, create one more named `blog`. This is where we’ll store uploaded blog post files.
2. Back in the Craft CMS control panel, navigate to “Settings” and choose “Assets”.
3. Choose “+ New volume”.
4. Enter the name “Blog”, enable the “Assets in this volume have public URLs” switch, enter a “Base URL” value of `@web/assets/blog`, and a “File System Path” of `@webroot/assets/blog`.
5. Save the Asset Volume.

::: tip
`@web` and `@webroot` are [aliases](https://docs.craftcms.com/v3/config/#aliases) Craft includes by default, pointing to the base website URL and document root file path respectively.
:::

<BrowserShot url="https://localhost:8080/admin/settings/assets/volumes/new" :link="false" caption="Settings for the new blog volume.">
<img src="../../images/tutorial-new-asset-volume.png" alt="Screenshot of settings for the new asset volume" />
</BrowserShot>

::: tip
If you’d rather store your Assets on a cloud service like Amazon S3, you could install the [Amazon S3 plugin](https://plugins.craftcms.com/aws-s3) in order to select and configure that Volume Type here.
:::

#### Create a Category Group

Now create a Category Group we can use for blog post categories:

1. Navigate to “Settings” and choose “Categories”.
2. Choose “+ New category group”.
3. Enter the name “Blog Categories” and limit “Max Levels” to `1` for now.
4. For “Category URI Format”, enter `blog/category/{slug}` and set the template to `blog/_category`.
5. Save the Category Group.

<BrowserShot url="https://localhost:8080/admin/settings/categories/new" :link="false" caption="Settings for the new blog category group.">
<img src="../../images/tutorial-new-category-group.png" alt="Screenshot of new category group fields" />
</BrowserShot>

#### Install the Redactor plugin for rich text fields

You’ll probably want a rich text editor (WYSISYG) for editing the main text of your blog posts. For this, we’ll install the first-party Redactor plugin. You can do this through the control panel or from the console. Let’s be adventurous and use console commands:

1. From your terminal, run `composer require craftcms/redactor`. Composer will download the plugin and add it to your project.
2. Now run `./craft install/plugin redactor`.

That’s it! The Redactor plugin is installed and ready to use in our site.

<BrowserShot url="https://localhost:8080/admin/settings/plugins" :link="false" caption="Redactor now appears in the list of installed Plugins, where it can also be disabled and uninstalled.">
<img src="../../images/tutorial-redactor-plugin.png" alt="Screenshot of plugins list showing Redactor installed" />
</BrowserShot>

#### Create individual fields

Next, let’s create the individual fields for our blog posts:

1. Navigate to “Settings” and choose “Fields”.
2. Choose “+ New group” to create a new field group with the name “Blog Post Fields”. Save the group.
3. Create a Plain Text “Summary” field.  
   Choose “New Field”, and start by creating a new Plain Text field named “Summary”. Use the “Instructions” input to help the content editor know what to do. Add “Enter a brief, one or two sentence post summary.”. Enable “Allow line breaks” and set “Initial Rows” to `1`. Save the field.
4. Create an Assets “Feature Image” field.  
   Choose “New Field” again, enter “Feature Image” for its name, and choose “Assets” from the “Field Type” dropdown menu. Enable “Restrict uploads to a single folder?” and select the “Blog” volume. Enable “Restrict allowed file types?” and check “Image” to ensure content editors can only select files that are images. Set Limit to `1` and save the field.
5. Create a Categories field named “Post Categories”.  
   Again choose “New Field”, enter “Post Categories” for its name, and select “Categories” as the field type. The “Source” setting will default to our “Blog Categories”, so we can just save the field.
6. Create a Matrix field named “Post Content”.  
   Choose “New Field” once more, enter “Post Content” for its name, and choose “Matrix” from the “Field Type” dropdown menu. We’ll use the Configuration setting to define two Block Types that can be added and reordered to build the post content.
   1. First add a text block an author can use to enter rich text.  
      Choose “+ New block type” and enter “Text” for its name. In the Field Settings section, enter the name “Text” again and select “Rich Text” from the “Field Type” dropdown menu. Since every post should have at least some text, make sure “This field is required” is checked.
   2. Add one more block for images.  
      Choose “+ New block type” again and enter “Image” for its name. Enter “Image” again for the “Name” under Field Settings. Mark this field required as well and select “Assets” from the “Field Type” dropdown menu. Restrict uploads to the “Blog” volume, enable “Restrict allowed file types?” and make sure “Image” is checked.
   3. Save the field.

<BrowserShot url="https://localhost:8080/admin/settings/fields/2" :link="false" caption="Our complete group of new fields.">
<img src="../../images/tutorial-new-blog-fields.png" alt="Screenshot of complete Blog Post Fields group" />
</BrowserShot>

#### Add fields to the blog field layout

Now we have everything we need to collect content for our blog posts. If you were to create a new entry right now, however, you’d still only see that Title field. It’s time to add our custom fields to the blog section in a Field Layout:

1. Navigate to “Settings” and return to “Sections”.
2. If you chose the name of the section that’d take you back to the settings we established earlier. This time, choose “Edit entry types (1)”, and then choose the “Blog” entry type that was added for you.
3. At the bottom of this view you’ll see the field layout designer. Choose “+ New Tab”.
4. Select the gear icon to the right of the new tab, choose “Rename”, and give this tab a better label such as “Post Content”.
5. Drag each of the fields we created earlier to this “Post Content” tab, in whatever order you’d like.
6. Since every blog post should have some kind of content, choose the gear icon to the right of the “Post Content” field and make sure it’s required.
7. Save the field layout.

::: tip
You can also drag an entire field group from the available sets into your entry type’s field layout.
:::

<BrowserShot url="https://localhost:8080/admin/settings/sections/1/entrytypes/1" :link="false" caption="Completed blog entry type field layout.">
<img src="../../images/tutorial-blog-field-layout.png" alt="Screenshot of complete blog field layout" />
</BrowserShot>

Once you’ve added fields to the blog section’s field layout, return to “Entries” and create a new “Blog” entry. You’ll see each of the fields you created and you’re ready to publish some content!

<BrowserShot url="https://localhost:8080/admin/entries/blog/7?draftId=6&fresh=1" :link="false" caption="A new blog post entry now includes our custom fields.">
<img src="../../images/tutorial-new-entry-with-fields.png" alt="Screenshot of new entry screen with our custom fields" />
</BrowserShot>

## Configure globals

Often you’ll have little bits of information you’d like to display on many pages of a site, not limited to just one entry. In this case we’ll add a brief description of the blog that can be shown beneath posts—this is a perfect use for a Global Set.

Just like the blog post, let’s start by adding a field for this description:

1. Navigate to “Settings” and choose “Fields”.
2. Choose “+ New group” and create a group called “Global Fields”.
3. With that “Global Fields” group selected, choose “+ New field”.
4. Give this new field a name of “Site Description”, and make it a Plain Text field that allows line breaks.
5. Save the field.

Now let’s create a Global Set and add the “Site Description” field to it:

1. Navigate to “Settings” and choose “Globals”.
2. Choose “+ New global set”.
3. Give the new global set a name of “Site Information”, then select the “Field Layout” tab.
4. Choose “+ New Tab” in the field layout designer, choose a descriptive name to your tab, and drag the “Site Description” field into that tab.
5. Save the global set.

You’ll now see a “Globals” section in Craft’s main navigation. The site’s starting to take shape!

Visit Globals and add some kind of public description for this blog project.

<BrowserShot url="https://localhost:8080/admin/globals/siteInformation" :link="false" caption="Site Description field we added to Globals.">
<img src="../../images/tutorial-globals.png" alt="Screenshot of Globals section displaying the newly-added Site Description field" />
</BrowserShot>

## Create an about page

Sometimes you’ll have unique, one-off pages that don’t make sense as a Section. Unlike the content you might store in Globals, however, each page would need its own field set and have its own URL. This is what Singles are for.

Let’s create a Single for an “About” page that will include a headshot and bio.

We’ll want to start again with our fields. To keep things tidy, we’ll create a volume for generic images and then add an Assets field to use it. Rather than create a new field for content this time, we’ll re-use the Matrix block we created earlier.

First, let’s add a volume for generic images since we may need more over time and don’t want to confuse them with blog post content:

1. In the `assets` folder you created earlier, create a new directory called `general`.
2. Back in the Craft CMS control panel, navigate to “Settings” and choose “Assets”.
3. Choose “+ New volume”.
4. Enter the name “General”, enable the “Assets in this volume have public URLs” switch, enter a “Base URL” value of `@web/assets/general`, and a “File System Path” of `@webroot/assets/general`.
5. Save the Asset Volume.

Now let’s create a new Assets field for the about page image:

1. Navigate to “Settings” and choose “Fields”.
2. Create a “Singles Fields” field group, then choose “+ New field”.
3. Create a field called “About Image”, selecting a “Assets” from the “Field Type” dropdown menu.
4. Enable “Restrict uploads to a single folder?” and select only “General” under “Sources”. Enable “Restrict allowed file types?” and select “Image”.
5. Save the field.

Now we can create the about page single:

1. Navigate to “Settings”, choose “Sections”, and then choose “+ New section”.
2. Enter “About” for the section name.
3. To make this new section a single, select “Single” from the “Section Type” dropdown menu. Notice that the Site Settings change to take a single URI rather than an Entry URI Format that would be required for a Section.
4. Enter `about` for “URI”, and `_singles/about` for “Template”.
5. Save this section.

<BrowserShot url="https://localhost:8080/admin/settings/sections/new" :link="false" caption="Settings for the new about single.">
<img src="../../images/tutorial-about-single.png" alt="Screenshot of new single fields" />
</BrowserShot>

Follow the same process as the blog section to add fields to the about single:

1. Navigate to “Settings”, choose “Sections”, and choose “Edit entry type” to the right of the “About” single.
2. Create a “Content” tab and drag the “About Image” and “Post Content” fields to it. (Notice we’re re-using the “Post Content” field we created for blog entries.)
3. Save the entry type.

<BrowserShot url="https://localhost:8080/admin/settings/sections/2/entrytypes/2" :link="false" caption="The new about single’s field layout configuration.">
<img src="../../images/tutorial-about-field-layout.png" alt="Screenshot of about field type configuration" />
</BrowserShot>

::: tip
You could also follow the same steps to create a Single for the home page (checking the little home icon), and once more for the blog landing page. But we don’t need to worry about either of those right now.
:::

### Edit entries

It’s time to add an entry!

#### Add a blog entry

Navigate to “Entries” and create a new blog entry. Fill in each field.

<BrowserShot url="https://localhost:8080/admin/entries/blog/9?draftId=7&fresh=1" :link="false" caption="A complete new blog post ready to be saved.">
<img src="../../images/tutorial-new-entry.png" alt="Screenshot of blog post entry with fields filled in" />
</BrowserShot>

While this should be fairly intuitive, there are a few things you might want to know about:

- **Edits are automatically saved while you work.**  
  Craft saves your work as you go, but you always decide when to _publish_. Edits on an already-published entry automatically start a new draft, and you can always see the save status and even leave notes in the versions menu. This menu will also let you see previous drafts and versions, which can be handy:  
   ![](../../images/tutorial-draft-autosave.png =500x)
- **Double-click a related asset or category to edit it in place.**  
  Here, the default Title has been cleaned up so it’s more presentable:  
   ![](../../images/tutorial-edit-asset.png =400x)  
   When you do this, you’re editing that asset or category so any changes will carry over if you re-use it somewhere else. (Navigate to “Assets” and observe the update there as well, for example.)
- **Matrix is pretty cool.**  
  You can grab the handles next to Matrix blocks to re-order them, and each block also has a menu just to the left of that handle you can use to collapse, disable or delete the block. You can also use this as a convenient place to insert new blocks:  
   ![](../../images/tutorial-matrix-menu.png =800x)
- **You can fine-tune details for how and when your post is displayed.**  
  Craft will set a slug for you by default, and it’ll be used in the post URL once published. You can set the Post Date to a future date/time to have it appear then, and optionally add an Expiry Date to have it disappear later. You can always flip _Enabled_ off and know the post will be hidden publicly, regardless of other settings.  
   ![](../../images/tutorial-post-meta.png =450x)
- **You can share drafts privately.**  
  Choosing “Share” at the top of the entry will always give you a URL for viewing the content you’re looking at. If it’s unpublished content, the URL will include an `x-craft-preview` token that can be used for a limited time [determined by your settings](https://docs.craftcms.com/v3/config/config-settings.html#defaulttokenduration).

#### Add about content

Navigate to “Entries”, select “Singles”, and choose “About”.

You’ll notice this is similar to editing a blog post entry, except that the slug is fixed and there are no “Post Date” or “Expiry Date” fields. This is because the single isn’t one post in a series, but a single post meant to live at a specific URL.

Go ahead and fill in some content!

#### Linking to pages

Once you’ve saved an entry, you can use the globe icon from the Entries listing to jump to its public URL. The result foreshadows what’s next:

<BrowserShot url="https://localhost:8080/blog/my-first-post" :link="false" caption="The front end is missing.">
<img src="../../images/tutorial-404.png" alt="Screenshot of public post URL 404" />
</BrowserShot>

This is not an acceptable way to display a blog post. Let’s continue to the next section and build a front end!

TODO: integrate a Structure?
