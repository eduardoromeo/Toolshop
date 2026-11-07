import type { Page } from '@playwright/test';

export interface UsuarioRegistro {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const U1: UsuarioRegistro = {
  firstName: 'Customer',
  lastName: 'User',
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
};

export function nuevoUsuario(overrides: Partial<UsuarioRegistro> = {}): UsuarioRegistro {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return {
    firstName: 'Test',
    lastName: 'Customer',
    email: `test-${id}@example.com`,
    password: `Test-${id}aA1!`,
    ...overrides,
  };
}

export async function irARegistro(page: Page): Promise<void> {
  await page.goto('/auth/register');
}

export async function irAInicioSesion(page: Page): Promise<void> {
  await page.goto('/auth/login');
}

export async function completarRegistro(page: Page, usuario: UsuarioRegistro): Promise<void> {
  await page.locator('[data-test="first-name"]').fill(usuario.firstName);
  await page.locator('[data-test="last-name"]').fill(usuario.lastName);
  await page.locator('[data-test="dob"]').fill('1990-01-01');
  await page.locator('[data-test="country"]').selectOption('US');
  await page.locator('[data-test="postal_code"]').fill('10001');
  await page.locator('[data-test="house_number"]').fill('1');
  await page.locator('[data-test="street"]').fill('123 Test Street');
  await page.locator('[data-test="city"]').fill('New York');
  await page.locator('[data-test="state"]').fill('New York');
  await page.locator('[data-test="phone"]').fill('2025550147');
  await page.locator('[data-test="email"]').fill(usuario.email);
  await page.locator('[data-test="password"]').fill(usuario.password);
}

export async function enviarRegistro(page: Page): Promise<void> {
  await page.locator('[data-test="register-submit"]').click();
}

export async function iniciarSesion(page: Page, email: string, password: string): Promise<void> {
  await page.locator('[data-test="email"]').fill(email);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-submit"]').click();
}

export async function registrarUsuario(page: Page, usuario: UsuarioRegistro): Promise<void> {
  await irARegistro(page);
  await completarRegistro(page, usuario);
  await enviarRegistro(page);
}