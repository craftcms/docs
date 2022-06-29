const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/docs/");
});

test.describe("Search", () => {
  test("should display multi-set results from landing page", async ({
    page,
  }) => {
    await page.locator(".search-box input").click();
    await page.keyboard.type("install");
    // should see install instruction results for Craft, Commerce, and Nitro
    await expect(page.locator(".suggestions")).toContainText([
      "Craft CMS",
      "Craft Commerce"
    ]);
  });

  test("should display single result set once a product is chosen", async ({
    page,
  }) => {
    // click “Craft CMS” doc set link
    await page.locator(".primary-sets .doc-set:nth-child(2)").click();
    await page.locator(".search-box input").click();
    await page.keyboard.type("install");
    // should *only* see Craft results here
    await expect(page.locator(".suggestions")).not.toContainText([
      "Craft Commerce"
    ]);
  });

  test("forward slash activates search input", async ({ page }) => {
    // click “Craft CMS” doc set link
    await page.locator(".primary-sets .doc-set:nth-child(2)").click();
    // click “Installation” in the sidebar to go to that page
    await page
      .locator('.sidebar-link:has-text("Installation"):visible')
      .click();
    // click “Troubleshooting” to jump to the _end_ of the Installation page
    await page
      .locator('.sidebar-link:has-text("Troubleshooting"):visible')
      .click();
    await page.keyboard.press("/");
    await expect(page.locator(".search-box input")).toBeFocused();
  });
});
