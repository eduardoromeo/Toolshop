import { expect, type Page } from '@playwright/test';

export const API_URL = 'http://localhost:8091';

interface Product {
  id: string | number;
  name: string;
  price: number;
  product_image?: {
    file_name: string;
  } | null;
}

interface ProductList {
  data: Product[];
}

export async function productosDeApi(page: Page): Promise<ProductList> {
  const response = await page.request.fetch(`${API_URL}/products`, {
    method: 'QUERY',
    data: { page: '1' },
  });

  if (!response.ok()) {
    throw new Error(`Could not load products from the API: ${response.status()} ${response.statusText()}`);
  }

  return response.json() as Promise<ProductList>;
}

export async function irAlCatalogo(page: Page): Promise<void> {
  await page.goto('/');
  await expect(page.locator('[data-test="product-name"]').first()).toBeVisible();
}

export async function nombresVisibles(page: Page): Promise<string[]> {
  const names = await page.locator('[data-test="product-name"]').allTextContents();
  return names.map((name) => name.trim());
}

export async function sinErroresTecnicos(page: Page): Promise<void> {
  await expect(page.locator('body')).not.toContainText(/server error|exception|stack trace|sqlstate/i);
}

export async function simularFallaDelServicio(page: Page): Promise<void> {
  await page.route(`${API_URL}/products**`, (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Service unavailable' }),
    }),
  );
}
