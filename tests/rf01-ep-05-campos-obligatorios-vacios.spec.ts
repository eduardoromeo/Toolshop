import { test, expect } from '@playwright/test';
import {
  completarRegistro, enviarRegistro, irARegistro, nuevoUsuario,
} from './support/registro';

// HU-LOGIN-01 · RF01-EP-05: Campos obligatorios vacíos
test.describe('RF01-EP-05 · Campos obligatorios vacíos', () => {

  test('RF01-TC-05.1 · Formulario completamente vacío', async ({ page }) => {
    await irARegistro(page);
    await enviarRegistro(page);

    await expect(page).toHaveURL(/\/auth\/register/);
    await expect(page.locator('[data-test="first-name-error"]')).toBeVisible();
    await expect(page.locator('[data-test="last-name-error"]')).toBeVisible();
    await expect(page.locator('[data-test="email-error"]')).toBeVisible();
    await expect(page.locator('[data-test="password-error"]')).toBeVisible();
  });

  test('RF01-TC-05.2 · Un solo campo obligatorio vacío (correo)', async ({ page }) => {
    await irARegistro(page);
    await completarRegistro(page, nuevoUsuario({ email: '' }));
    await enviarRegistro(page);

    await expect(page.locator('[data-test="email-error"]')).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/register/);
  });

});
