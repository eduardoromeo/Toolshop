# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: hu-login-01\rf01-ep-03-acceso-con-la-cuenta-creada.spec.ts >> RF01-EP-03 · Acceso con la cuenta creada >> RF01-TC-03.2 · La cuenta muestra los datos del usuario registrado
- Location: tests\hu-login-01\rf01-ep-03-acceso-con-la-cuenta-creada.spec.ts:17:3

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('[data-test="nav-menu"]')
Expected substring: "Eduardo Moreira"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" locator('[data-test="nav-menu"]') with timeout 5000ms
  - waiting for locator('[data-test="nav-menu"]')

```

```yaml
- text: View the
- link "Documentation":
  - /url: https://testsmith-io.github.io/practice-software-testing/#/
- text: for this application. Practice Black Box Testing & Bug Hunting
- button "Testing Guide"
- navigation:
  - link "Practice Software Testing - Toolshop":
    - /url: /
    - img
  - menubar "Main menu":
    - menuitem "Home":
      - link "Home":
        - /url: /
    - menuitem "Categories":
      - button "Categories"
    - menuitem "Contact":
      - link "Contact":
        - /url: /contact
    - menuitem "Sign in":
      - link "Sign in":
        - /url: /auth/login
  - button "Select language": EN
- heading "Login" [level=3]
- text: Email address *
- textbox "Email address *" [invalid]:
  - /placeholder: Your email
- text: Email is required Password *
- textbox "Password *" [invalid]:
  - /placeholder: Your password
- button
- text: Password is required
- button "Login"
- paragraph:
  - text: Not yet an account?
  - link "Register your account":
    - /url: /auth/register
  - link "Forgot your Password?":
    - /url: /auth/forgot-password
- contentinfo:
  - text: This is a DEMO application (
  - link "GitHub repo":
    - /url: https://github.com/testsmith-io/practice-software-testing
  - text: ), used for software testing training purpose. |
  - link "Privacy Policy":
    - /url: /privacy
  - text: "| Banner photo by"
  - link "Barn Images":
    - /url: https://unsplash.com/@barnimages
  - text: "on"
  - link "Unsplash":
    - /url: https://unsplash.com/photos/t5YUoHW6zRo
  - text: . v6.0.0 | Built 2026-07-05 | Angular 20.0.5
- button "Open chat":
  - img
- button "Show live shop activity"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { iniciarSesion, nuevoUsuario, registrarUsuario } from '../support/registro';
  3  | 
  4  | // HU-LOGIN-01 · RF01-EP-03: Acceso con la cuenta creada
  5  | test.describe('RF01-EP-03 · Acceso con la cuenta creada', () => {
  6  | 
  7  |   test('RF01-TC-03.1 · Acceso con el correo y la contraseña de la cuenta creada', async ({ page }) => {
  8  |     const u2 = nuevoUsuario();
  9  |     await registrarUsuario(page, u2);
  10 | 
  11 |     await iniciarSesion(page, u2.email, u2.password);
  12 | 
  13 |     await expect(page).toHaveURL(/\/account/);
  14 |     await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
  15 |   });
  16 | 
  17 |   test('RF01-TC-03.2 · La cuenta muestra los datos del usuario registrado', async ({ page }) => {
  18 |     const u2 = nuevoUsuario({ firstName: 'Eduardo', lastName: 'Moreira' });
  19 |     await registrarUsuario(page, u2);
  20 | 
  21 |     await iniciarSesion(page, u2.email, u2.password);
  22 | 
> 23 |     await expect(page.locator('[data-test="nav-menu"]')).toContainText(`${u2.firstName} ${u2.lastName}`);
     |                                                          ^ Error: expect(locator).toContainText(expected) failed
  24 |   });
  25 | 
  26 | });
  27 | 
```