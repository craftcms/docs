# Finish setup

We already know you’re on the right track if visiting your local site URL in your browser gets you a `HTTP 503 – Service Unavailable` response:

<BrowserShot url="http://tutorial.test" :link="false">
<img src="../images/503.png" alt="Screenshot of 503 unavailable error that means we’re close" />
</BrowserShot>

This is because Craft isn’t installed and doesn’t have anything to show to normal visitors. (And all the detailed output is there because we’re in local development mode.)

But you’re not a normal visitor, you’re an admin.

Visit `https://tutorial.nitro/admin` instead. You should have an **Install Craft** button:

<BrowserShot url="https://tutorial.test/admin/install" :link="false">
<img src="../images/install.png" alt="Screenshot of the first install step" />
</BrowserShot>

::: tip No install button?
Check your environment setup, double-check that your server is running, and make sure you’ve got the right base URL for your site. See [Troubleshooting a Failed Craft Installation
](https://craftcms.com/knowledge-base/troubleshooting-failed-installation) and [Troubleshooting Database Connection Issues](https://craftcms.com/knowledge-base/troubleshooting-database-connection-issues).
:::

If you’ve managed _not_ to push the red button, go ahead!

You’ll be prompted to accept Craft’s license agreement, create your first user account, and set your site’s name, URL and default language.

Now the real fun begins.
