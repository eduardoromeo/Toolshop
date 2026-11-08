import { test, expect } from '@playwright/test';
import {
  completarRegistro, enviarRegistro, irAInicioSesion, irARegistro,
  iniciarSesion, nuevoUsuario, U1,
} from '../support/registro';

// HU-LOGIN-01 · RF01-EP-04: Rechazo de un correo ya registrado
test.describe('RF01-EP-04 · Rechazo de un correo ya registrado', () => {

  test('RF01-TC-04.1 · Rechazo de un correo ya registrado', async ({ page }) => {
    await irARegistro(page);
    await completarRegistro(page, nuevoUsuario({ email: U1.email }));
    await enviarRegistro(page);

    await expect(page.locator('[data-test="register-error"]')).toContainText(/already|exist|duplicate/i);
    await expect(page).toHaveURL(/\/auth\/register/);
  });

  test('RF01-TC-04.2 · No se duplica la cuenta existente (U1 accede con su contraseña original)', async ({ page }) => {
    await irARegistro(page);
    await completarRegistro(page, nuevoUsuario({ email: U1.email, password: 'OtraClave456!' }));
    await enviarRegistro(page);
    await expect(page.locator('[data-test="register-error"]')).toBeVisible();

    await irAInicioSesion(page);
    await iniciarSesion(page, U1.email, U1.password);

    await expect(page).toHaveURL(/\/account/);
  });

});
