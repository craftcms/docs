const { test, chromium } = require("@playwright/test");
const { createHtmlReport } = require("axe-html-reporter");
const { injectAxe, getAxeResults } = require("axe-playwright");

let browser;
let page;

test.beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto("/docs/");
  await injectAxe(page);
});

test.afterAll(async () => {
  await browser.close();
});

test.describe("Playwright web page accessibility test", () => {
  test("simple accessibility run", async () => {
    const axeResults = await getAxeResults(page);
    createHtmlReport({
      results: axeResults,
      options: {
        outputDir: "report/axe",
        reportFileName: `axe.html`,
      },
    });
  });
});
