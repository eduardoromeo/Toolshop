import { test, expect } from '@playwright/test';
import { iniciarSesion, nuevoUsuario, registrarUsuario } from '../support/registro';

// HU-LOGIN-01 · RF01-EP-03: Acceso con la cuenta creada
test.describe('RF01-EP-03 · Acceso con la cuenta creada', () => {

  test('RF01-TC-03.1 · Acceso con el correo y la contraseña de la cuenta creada', async ({ page }) => {
    const u2 = nuevoUsuario();
    await registrarUsuario(page, u2);

    await iniciarSesion(page, u2.email, u2.password);

    await expect(page).toHaveURL(/\/account/);
    await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
  });

  test('RF01-TC-03.2 · La cuenta muestra los datos del usuario registrado', async ({ page }) => {
    const u2 = nuevoUsuario({ firstName: 'Eduardo', lastName: 'Moreira' });
    await registrarUsuario(page, u2);

    await iniciarSesion(page, u2.email, u2.password);

    await expect(page.locator('[data-test="nav-menu"]')).toContainText(`${u2.firstName} ${u2.lastName}`);
  });

});
