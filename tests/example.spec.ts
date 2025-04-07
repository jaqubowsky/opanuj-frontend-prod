import { expect, test } from "@playwright/test";

test.describe("App E2E Tests", () => {
  test("should load the application", async ({ page }) => {
    // Navigate to the application
    await page.goto("/");

    // Verify that the page loads with the React logo
    const logo = page.getByAltText("React logo");
    await expect(logo).toBeVisible();
  });

  test("should have correct initial counter value", async ({ page }) => {
    await page.goto("/");

    // Check if the count button exists and has initial value
    const countButton = page.getByText("count is 0");
    await expect(countButton).toBeVisible();
  });

  test("should increment counter when clicked", async ({ page }) => {
    await page.goto("/");

    // Click the count button
    await page.getByText("count is 0").click();

    // Verify the count has increased
    await expect(page.getByText("count is 1")).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");

    // Check if the Vite and React links are present
    const viteLink = page.getByRole("link", { name: /vite/i });
    const reactLink = page.getByRole("link", { name: /react/i });

    await expect(viteLink).toBeVisible();
    await expect(reactLink).toBeVisible();
  });
});
