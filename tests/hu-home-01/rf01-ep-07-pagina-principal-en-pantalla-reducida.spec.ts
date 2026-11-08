import { test, expect } from '@playwright/test';
import { irAlCatalogo } from '../support/home';

// HU-HOME-01 · RF01-EP-07: Página principal en pantalla reducida
// Caso de Jira: RF01-TC-07 (prioridad Media, tipo Robustez). Criterios: CA-01.3.
test.describe('RF01-EP-07 · Página principal en pantalla reducida', () => {

  test('RF01-TC-07 · Página principal en pantalla reducida', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await irAlCatalogo(page);

    const sinDesborde = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
    expect(sinDesborde).toBeTruthy();
    await expect(page.locator('.navbar-toggler')).toBeVisible();
    await page.locator('.navbar-toggler').click();
    await expect(page.locator('[data-test="nav-home"]')).toBeVisible();
    await page.mouse.wheel(0, 1200);
    await expect(page.locator('[data-test="product-name"]').first()).toBeAttached();
  });

});
