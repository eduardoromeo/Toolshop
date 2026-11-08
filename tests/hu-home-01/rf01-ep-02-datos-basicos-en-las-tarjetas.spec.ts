import { test, expect } from '@playwright/test';
import { irAlCatalogo, productosDeApi } from '../support/home';

// HU-HOME-01 · RF01-EP-02: Datos básicos en las tarjetas
// Caso de Jira: RF01-TC-02 (prioridad Alta, tipo Consistencia). Criterios: CA-01.2.
test.describe('RF01-EP-02 · Datos básicos en las tarjetas', () => {

  test('RF01-TC-02 · Datos básicos en las tarjetas', async ({ page }) => {
    const [p1] = (await productosDeApi(page)).data;
    await irAlCatalogo(page);

    const tarjeta = page.locator(`[data-test="product-${p1.id}"]`);
    await expect(tarjeta.locator('[data-test="product-name"]')).toContainText(p1.name);
    await expect(tarjeta.locator('[data-test="product-price"]')).toContainText(p1.price.toFixed(2));
    await expect(tarjeta.locator('img')).toHaveAttribute('alt', p1.name);
    await expect(tarjeta.locator('img')).toBeVisible();
  });

});
