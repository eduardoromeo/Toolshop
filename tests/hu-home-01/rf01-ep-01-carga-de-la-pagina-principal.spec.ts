import { test, expect } from '@playwright/test';
import { irAlCatalogo, nombresVisibles, sinErroresTecnicos } from '../support/home';

// HU-HOME-01 · RF01-EP-01: Carga de la página principal
// Caso de Jira: RF01-TC-01 (prioridad Alta, tipo Positivo). Criterios: CA-01.1.
test.describe('RF01-EP-01 · Carga de la página principal', () => {

  test('RF01-TC-01 · Carga de la página principal', async ({ page }) => {
    await irAlCatalogo(page);

    expect((await nombresVisibles(page)).length).toBeGreaterThan(0);
    await sinErroresTecnicos(page);
  });

});
