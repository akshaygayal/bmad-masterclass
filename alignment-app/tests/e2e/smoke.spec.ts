import { expect, test } from "@playwright/test";

test("S1 renders with both actions present but unavailable", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Requirements Interpretation Alignment");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Requirements Interpretation Alignment");

  const create = page.getByRole("button", { name: "Create alignment session" });
  const demo = page.getByRole("button", { name: "Open demo" });
  await expect(create).toBeDisabled();
  await expect(demo).toBeDisabled();
  await expect(page.getByText(/Not available yet/)).toBeVisible();
  await expect(create).toHaveAccessibleDescription(/Not available yet/);
});

test("S1 makes no third-party requests", async ({ page, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const thirdParty: string[] = [];
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.protocol.startsWith("http") && url.origin !== origin) thirdParty.push(request.url());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(thirdParty).toEqual([]);
});

test("S1 has no horizontal scroll at the 1024px minimum width", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
