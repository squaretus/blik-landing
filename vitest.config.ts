import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    coverage: {
      provider: 'v8',
      // text/-summary — лог CI; json-summary — coverage/coverage-summary.json
      // (.total.lines.pct) для self-hosted coverage-чека на PR.
      reporter: ['text', 'text-summary', 'json-summary'],
      include: ['src/**'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/test/**',
        'src/**/*.d.ts',
        // Без исполняемой логики — не искажают знаменатель покрытия.
        'src/app/robots.ts',
        'src/app/sitemap.ts',
      ],
      // Ratchet-гейт «без отката»: пороги выставляются на текущий фактический
      // уровень (минус ~0.5 на детерминированный шум v8) и поднимаются вверх
      // по мере роста покрытия.
      thresholds: {
        lines: 76,
        functions: 63,
        branches: 66,
        statements: 73.5,
      },
    },
  },
});
