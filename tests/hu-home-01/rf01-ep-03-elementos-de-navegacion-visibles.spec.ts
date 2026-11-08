import { test, expect } from '@playwright/test';
import { irAlCatalogo } from '../support/home';

// HU-HOME-01 · RF01-EP-03: Elementos de navegación visibles
// Caso de Jira: RF01-TC-03 (prioridad Alta, tipo Navegación). Criterios: CA-01.3.
test.describe('RF01-EP-03 · Elementos de navegación visibles', () => {

  test('RF01-TC-03 · Elementos de navegación visibles', async ({ page }) => {
    await irAlCatalogo(page);

    for (const item of ['nav-home', 'nav-categories', 'nav-contact', 'nav-sign-in', 'search-query']) {
      await expect(page.locator(`[data-test="${item}"]`)).toBeVisible();
    }
    await page.locator('[data-test="nav-sign-in"]').click();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

});
