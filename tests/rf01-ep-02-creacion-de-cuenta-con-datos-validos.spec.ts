import { test, expect } from '@playwright/test';
import {
  completarRegistro, enviarRegistro, irARegistro, nuevoUsuario,
} from './support/registro';

// HU-LOGIN-01 · RF01-EP-02: Creación de cuenta con datos válidos
test.describe('RF01-EP-02 · Creación de cuenta con datos válidos', () => {

  test('RF01-TC-02.1 · Crear la cuenta con todos los datos válidos', async ({ page }) => {
    await irARegistro(page);
    await completarRegistro(page, nuevoUsuario());
    await enviarRegistro(page);

    await expect(page.locator('[data-test="register-error"]')).toHaveCount(0);
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('RF01-TC-02.2 · Confirmación tras el registro (redirige al inicio de sesión)', async ({ page }) => {
    await irARegistro(page);
    await completarRegistro(page, nuevoUsuario());
    await enviarRegistro(page);

    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator('[data-test="login-form"]')).toBeVisible();
  });

});
