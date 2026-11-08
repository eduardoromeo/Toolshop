import { test, expect } from '@playwright/test';
import { irAlCatalogo, productosDeApi } from '../support/home';

// HU-HOME-01 · RF01-EP-06: Producto sin imagen configurada
// Caso de Jira: RF01-TC-06 (prioridad Media, tipo Límite). Criterios: CA-01.2.
test.describe('RF01-EP-06 · Producto sin imagen configurada', () => {

  test('RF01-TC-06 · Producto sin imagen configurada', async ({ page }) => {
    const [p] = (await productosDeApi(page)).data;
    // Se bloquea la imagen del producto para simular que no tiene imagen configurada.
    await page.route(`**/assets/img/products/${p.product_image?.file_name}`, (route) => route.abort());

    await irAlCatalogo(page);

    const tarjeta = page.locator(`[data-test="product-${p.id}"]`);
    await expect(tarjeta.locator('[data-test="product-name"]')).toContainText(p.name);
    await expect(tarjeta.locator('[data-test="product-price"]')).toContainText(p.price.toFixed(2));
    const sinDesborde = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
    expect(sinDesborde).toBeTruthy();
  });

});
