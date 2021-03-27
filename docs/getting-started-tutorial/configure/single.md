# Create an about page

Sometimes you’ll have unique, one-off pages that don’t make sense as a Section. Unlike the content you might store in Globals, however, each page *would* need to live at its own URL. A Single is perfect for this.

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

<BrowserShot url="http://tutorial.test/admin/settings/sections/new" :link="false" caption="Settings for the new about single.">
<img src="../images/about-single.png" alt="Screenshot of new single fields" />
</BrowserShot>

Follow the same process as the blog section to add fields to the about single:

1. Navigate to “Settings”, choose “Sections”, and choose “Edit entry type” to the right of the “About” single.
2. Create a “Content” tab and drag the “About Image” and “Post Content” fields to it. (Notice we’re re-using the “Post Content” field we created for blog entries.)
3. Save the entry type.

<BrowserShot url="http://tutorial.test/admin/settings/sections/2/entrytypes/2" :link="false" caption="The new about single’s field layout configuration.">
<img src="../images/about-field-layout.png" alt="Screenshot of about field type configuration" />
</BrowserShot>

::: tip
You could also follow the same steps to create a Single for the home page (checking the little home icon), and once more for the blog landing page. But we don’t need to worry about either of those right now.
:::
