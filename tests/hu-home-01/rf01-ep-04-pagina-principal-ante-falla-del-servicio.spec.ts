import { test, expect } from '@playwright/test';
import { simularFallaDelServicio } from '../support/home';

// HU-HOME-01 · RF01-EP-04: Página principal ante falla del servicio
// Caso de Jira: RF01-TC-04 (prioridad Media, tipo Negativo). Criterios: CA-01.1.
test.describe('RF01-EP-04 · Página principal ante falla del servicio', () => {

  test('RF01-TC-04 · Página principal ante falla del servicio', async ({ page }) => {
    await simularFallaDelServicio(page);

    await page.goto('/');

    await expect(page.locator('[data-test="nav-home"]')).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/server error|exception|stack trace|sqlstate/i);
  });

});
