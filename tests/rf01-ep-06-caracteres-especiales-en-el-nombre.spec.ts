import { test, expect } from '@playwright/test';
import {
  completarRegistro, enviarRegistro, iniciarSesion, irARegistro, nuevoUsuario,
} from './support/registro';

// HU-LOGIN-01 · RF01-EP-06: Caracteres especiales en el nombre
test.describe('RF01-EP-06 · Caracteres especiales en el nombre', () => {

  test('RF01-TC-06.1 · Símbolos especiales en el nombre (respuesta controlada, sin errores técnicos)', async ({ page }) => {
    await irARegistro(page);
    await completarRegistro(page, nuevoUsuario({ firstName: '@#$%&*', lastName: '<b>!?</b>' }));
    await enviarRegistro(page);

    // Resultado válido: se acepta (redirige al login) o se rechaza con un mensaje visible.
    await expect(
      page.locator('[data-test="login-form"], [data-test="register-error"], [data-test="first-name-error"], [data-test="last-name-error"]').first(),
    ).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/exception|stack trace|sqlstate|server error/i);
  });

  test('RF01-TC-06.2 · Nombre con tilde y letra ñ conserva sus caracteres', async ({ page }) => {
    const u2 = nuevoUsuario({ firstName: 'José', lastName: 'Muñoz' });
    await irARegistro(page);
    await completarRegistro(page, u2);
    await enviarRegistro(page);
    await expect(page).toHaveURL(/\/auth\/login/);

    await iniciarSesion(page, u2.email, u2.password);

    await expect(page.locator('[data-test="nav-menu"]')).toContainText('José Muñoz');
  });

});
