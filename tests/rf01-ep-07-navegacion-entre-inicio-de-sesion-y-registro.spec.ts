import { test, expect } from '@playwright/test';
import { irAInicioSesion } from './support/registro';

// HU-LOGIN-01 · RF01-EP-07: Navegación entre inicio de sesión y registro
test.describe('RF01-EP-07 · Navegación entre inicio de sesión y registro', () => {

  test('RF01-TC-07.1 · De inicio de sesión a registro', async ({ page }) => {
    await irAInicioSesion(page);
    await page.locator('[data-test="register-link"]').click();

    await expect(page).toHaveURL(/\/auth\/register/);
    await expect(page.locator('[data-test="register-form"]')).toBeVisible();
  });

  test('RF01-TC-07.2 · De registro a inicio de sesión (botón «atrás»)', async ({ page }) => {
    await irAInicioSesion(page);
    await page.locator('[data-test="register-link"]').click();
    await expect(page.locator('[data-test="register-form"]')).toBeVisible();

    await page.goBack();

    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator('[data-test="login-form"]')).toBeVisible();
  });

});
