import { test, expect, type Page } from '@playwright/test';

async function irAInicioSesion(page: Page) {
  await page.goto('/auth/login');
}

// HU-LOGIN-01 · RF01-EP-01: Acceso al formulario de registro
test.describe('RF01-EP-01 · Acceso al formulario de registro', () => {

  test('RF01-TC-01.1 · El enlace de registro está visible en el inicio de sesión', async ({ page }) => {
    await irAInicioSesion(page);

    await expect(page.locator('[data-test="register-link"]')).toBeVisible();
  });

  test('RF01-TC-01.2 · El formulario de registro muestra los campos obligatorios', async ({ page }) => {
    await irAInicioSesion(page);
    await page.locator('[data-test="register-link"]').click();

    await expect(page).toHaveURL(/\/auth\/register/);
    for (const campo of ['first-name', 'last-name', 'email', 'password']) {
      await expect(page.locator(`[data-test="${campo}"]`)).toBeVisible();
    }
    await expect(page.locator('[data-test="register-submit"]')).toBeVisible();
  });

});
