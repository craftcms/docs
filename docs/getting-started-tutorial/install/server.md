# Set the web root

The last thing Craft needs is the ability to run in a web browser. For this, you’ll need to tell your web server to use Craft’s `web/` folder as the document root. The way you do this will depend on how you’ve chosen to set up your local environment—so refer back to the relevant environment setup guide.

If you attempt to visit your local site’s URL in your browser and see `HTTP 503 – Service Unavailable`, you’re on the right track!

<BrowserShot url="http://tutorial.test" :link="false">
<img src="../images/tutorial-503.png" alt="Screenshot of 503 unavailable error that means we’re close" />
</BrowserShot>

Use your admin panel URL instead. If your local environment uses `http://tutorial.test/`, for example, visit `http://tutorial.test/admin`. Instead of that 503 error, you should have a red “Install Craft” button.

<BrowserShot url="http://tutorial.test/admin/install" :link="false">
<img src="../images/tutorial-install.png" alt="Screenshot of 503 unavailable error that means we’re close" />
</BrowserShot>

If you’re getting other errors in your browser, check your environment’s setup guide and make sure you have the right base URL for your site and that the server is running.
