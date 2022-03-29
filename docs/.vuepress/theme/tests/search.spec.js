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
    await expect(page.locator(".suggestions")).toContainText([
      "Craft CMS",
      "Craft Commerce",
      "Craft Nitro",
    ]);
  });

  test("should display single result set once a product is chosen", async ({
    page,
  }) => {
    await page.locator(".primary-sets .doc-set:nth-child(2)").click();
    await page.locator(".search-box input").click();
    await page.keyboard.type("install");
    await expect(page.locator(".suggestions")).not.toContainText([
      "Craft Commerce",
      "Craft Nitro",
    ]);
  });

  test("forward slash activates search input", async ({ page }) => {
    await page.locator(".primary-sets .doc-set:nth-child(2)").click();
    await page
      .locator('.sidebar-link:has-text("Installation"):visible')
      .click();
    await page
      .locator('.sidebar-link:has-text("Troubleshooting"):visible')
      .click();
    await page.keyboard.press("/");
    await expect(page.locator(".search-box input")).toBeFocused();
  });
});
