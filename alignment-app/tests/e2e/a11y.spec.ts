import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Automated axe checks catch only part of WCAG 2.2 AA. Passing this is not a
// conformance claim.
test("S1 has no axe violations at WCAG 2.2 AA tags", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});
