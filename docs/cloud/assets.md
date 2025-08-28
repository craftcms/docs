# Assets

Each of the environments in your Craft Cloud projects come with a generous [storage quota](quotas.md).

To take advantage of that storage (and other features, like the built-in CDN and [image transform](#transforms) service), you must use the [Cloud extension](extension.md)’s built-in filesystem type.

## New Filesystems

New projects can start using it right away—new filesystems don’t require any special handling. You can [create a new filesystem and volume](/docs/5.x/reference/element-types/assets.html) the same way you would with any other filesystem type. Cloud filesystems do not require any credentials—they’re provided automatically by Cloud’s runtime.

When you are ready to stage or launch the project, you can [upload your local asset library](#uploading-to-a-bucket) to the equivalent subpath in the target Cloud environment’s storage bucket. Live assets can be referenced from a [local development environment](#local-development), in read-only mode.

## Converting a Filesystem

Existing projects may require some additional work to ensure their filesystems are migrated properly. This process will differ based on the filesystem’s *current* type—and if multiple filesystem types are represented in your configuration, you may need to follow different steps for each one.

::: warning
Filesystems’ base paths cannot overlap! Even if you only need a single filesystem on Cloud, we recommend using the Cloud filesystem’s **Subpath** option to make room at the root of your volume for other filesystems, later.
:::

Changes to your filesystems + volumes will be applied via [Project Config](/docs/5.x/system/project-config.html), the next time you deploy your environment.

### Local

Local filesystems are the most straightforward to migrate. Take note of the current filesystem’s **Base Path** setting, as we’ll copy this into the new Cloud filesystem, to take advantage of the files already on your development environment’s disk.

From your Local filesystem’s settings screen, change the **Filesystem Type** to **Cloud**. Copy the old **Base Path** and **Base URL** settings into the corresponding **Base Path** and **Base URL** fields, within the **Local Filesystem** section.

The **Subpath** setting is appended to the **Base Path** and **URL** values, automatically.

::: tip
You are welcome to relocate the on-disk files at this time, provided you update the **Base URL** and **Base Path** settings to match. It can be useful to keep all your Cloud fallback assets in an aptly-named directory like `@webroot/cloud-fallbacks`.

Remember to add whatever directory you choose to your `.gitignore`!
:::

Repeat this process for each of your Local filesystems—they will not work on Cloud! Double-check that you have replaced them all by visiting **Settings** → **Filesystems** and scanning down the **Type** column.

See the [Synchronizing Assets](#synchronizing-assets) section to learn about how to seed your Cloud storage with local assets.

### Remote

Craft doesn’t have a technical distinction between “local” and “remote” filesystems, but we’re addressing them separately here because the migration experience may differ greatly based on your existing storage provider.

We recommend downloading all the files from your remote filesystem (using whatever tool is compatible with that storage infrastructure), then switching the filesystem type and setting its **Subpath**, **Base Path**, and **Base URL** values.

Once the filesystem is working locally, you can [upload](#uploading-to-a-bucket) the assets to one of your project’s environments, ensuring they end up in the correct **Subpath** of the main `assets/` directory.

## Synchronizing Assets

You may upload and download assets from your environments’ storage bucket at any time.

::: warning
We generally discourage direct modification of your production bucket’s files (after an initial import), as it can cause issues for control panel users—Craft can lose track of files if it is not the source of a change.
:::

Both of the following processes require credentials for the target environment’s storage bucket. These secrets are available in a suitable format by visiting the **Access** tab of an environment in your Cloud project.

You can use a GUI (like [Transmit](https://panic.com/transmit/)) or CLI (like the [official AWS client](https://aws.amazon.com/cli/)) to perform transfers in either direction. Usage examples (like the commands in the following sections) are provided in-context, for common tools.

### Uploading to a Bucket

Your project’s storage bucket is identified via the credentials you generated via the **Access** screen, but it is your responsibility to upload assets to the correct path.

Let’s look at a command that uploads everything within a local `web/craft-cloud-assets/` folder to a Cloud storage bucket.

```bash
cd path/to/project/root
aws s3 sync ./web/craft-cloud-assets/ s3://{project-uuid}/{environment-uuid}/assets/
```

This command shows a URI beginning with `s3://`, followed by two segments (both UUIDs) that identify the target project and environment.

The third segment in the path (`assets/`) is mandatory. This is the top-most directory that any Craft asset filesystem will write to, and files uploaded outside of it will be undiscoverable by Craft—and may collide with artifacts uploaded to the bucket during a build.

Read more about the [`sync` command](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html) in the official AWS CLI documentation. If you are not confident about where files will end up, consider using `--dry-run` flag to list the operations that the CLI *would* attempt!

::: warning
If you want to synchronize files from only one filesystem, ensure the local *and* remote paths are set properly. The example assumes you want an exact replica of the `web/craft-cloud-assets/` directory in your storage bucket—whether that represents a single filesystem mounted at that base path, or multiple filesystems with unique base paths, within it.
:::

Clients that support setting a `Cache-Control` header or metadata when uploading files should use the value selected in the corresponding filesystem’s settings.

### Downloading from a Bucket

The same process can be used in reverse to download assets to your local environment:

```bash
cd path/to/project/root
aws s3 sync --delete s3://{project-uuid}/{environment-uuid}/assets/ ./web/craft-cloud-assets/
```

::: tip
For projects with large asset libraries (especially those over our soft 15GB per-environment [limit](quotas.md)), consider reaching out to us for recommendations about importing directly from other platforms. Credentials last for 1 hour—but as long as you use the `sync` command, it will be able to pick up where it left off.
:::

### Copying Assets Between Environments

Automated environment duplication/synchronization is a planned feature of Cloud. In the meantime, you can follow the instructions above to download and re-upload assets—or reach out to us if the time required for such an operation would be prohibitive.

## Transforms

The [Cloud extension](extension.md) transparently enhances Craft’s [asset transform](/docs/5.x/development/image-transforms.html) APIs by generating and caching images at the edge, using special pre-signed URLs. Existing transforms will work seamlessly on Cloud, whether predefined via [named transforms](/docs/5.x/development/image-transforms.html#applying-named-transforms-to-images) and as [ad-hoc transforms](/docs/5.x/development/image-transforms.html#defining-transforms-in-your-templates) (except for one [limitation](#limitations), noted below).

These images don’t contribute to your [storage quota](quotas.md), and there are no limits on the number of transforms or compute time.

### Content Negotiation

When no format is explicitly defined for a transform (or the transform uses the **Auto** format), our workers may create and return a more modern WEBP or AVIF file, if the client supports it.

### Limitations

Our workers treat the [`stretch` mode](/docs/5.x/development/image-transforms.html#stretch) similarly to how the CSS `object-fit: cover` property works—instead of independently scaling an image’s width and height to the specified dimensions, it enlarges the image proportionately to fill the space. This difference will only manifest if you are using the `stretch` mode, and setting _both_ the `height` and `width` properties in such a way that the transformed image’s aspect ratio would be different from the source.

Additional technical limitations include:

- The maximum image size is 70MB;
- Images must be smaller than 100 megapixels, and animated images must contain fewer than 50 megapixels across all frames;
- The longest edge of an image is 12,000 pixels (or 1,600 pixels when transcoded to AVIF);

In some situations where the requested transformation would result in a less efficient file (either by size or computation time), images may be delivered in a format other than what is requested.

### SVGs

SVGs are sanitized for security, but otherwise not modified in the process of creating a “transform.”

## Local Development

To simplify local and offline development, the Cloud filesystem supports a “local fallback” directory setting, which determines where assets are stored when running outside of the Cloud infrastructure.

If you would like to temporarily rewrite asset URLs to use the CDN (even in local development), grab these variables from your Cloud project and add them to your `.env` file:

```bash
# Copy from Project > Environment > Variables:
CRAFT_CLOUD_PROJECT_ID="..."
CRAFT_CLOUD_ENVIRONMENT_ID="..."

# Set directly in .env:
CRAFT_CLOUD_USE_ASSET_CDN=1
```

The Cloud extension will construct predictable production URLs for _existing_ assets. Note that uploading new assets to a remote Cloud bucket (or creating transforms from existing images) is not yet supported from local environments. The remote bucket is read-only in this scenario.
