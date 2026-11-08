import { test, expect } from '@playwright/test';
import { irAlCatalogo, nombresVisibles, productosDeApi } from '../support/home';

// HU-HOME-01 · RF01-EP-05: Catálogo en distintos navegadores
// Caso de Jira: RF01-TC-05 (prioridad Alta, tipo Equivalencia). Criterios: CA-01.1, CA-01.2.
test.describe('RF01-EP-05 · Catálogo en distintos navegadores', () => {

  test('RF01-TC-05 · Catálogo en distintos navegadores', async ({ page }) => {
    // El equivalente entre navegadores se logra ejecutando este test en los proyectos
    // chromium, firefox y webkit definidos en playwright.config.ts.
    const api = await productosDeApi(page);
    await irAlCatalogo(page);

    expect(await nombresVisibles(page)).toEqual(api.data.map((p) => p.name));
    await expect(page.locator('[data-test="sort"]')).toBeVisible();
    await expect(page.locator('[data-test="search-query"]')).toBeVisible();
  });

});
