# Архитектура blik-landing

## Стек
- Next.js 15 App Router в режиме `output: 'export'` — на выходе статический сайт (каталог `out/`).
- React 19, Tailwind CSS v4 (CSS-first, без config-файла), framer-motion.
- Тесты: vitest + @testing-library/react (jsdom), coverage v8 с ratchet-порогами.
- Хостинг: GitHub Pages (репо `squaretus/blik-landing`), кастомный домен `blik.app`.

## Персистентность
БД нет — статический сайт без серверной части. Правило UUID-PK неприменимо.

## Запуск
```bash
npm install
npm run dev        # dev-сервер на :3000
npm run build      # static export → out/
npm test           # vitest
```

## Структура (верхний уровень)
```
next.config.js        — output: 'export', images.unoptimized
src/app/              — layout.tsx, page.tsx, globals.css, sitemap.ts, robots.ts
src/components/
  landing/HomePage.tsx — единственная страница: Navbar/Hero/Features/Showcase/CTA/Footer
  ui/                  — ThemeToggle, NeonBorder, Logo, Button, Spinner
src/lib/utils.ts      — cn()
public/               — CNAME (blik.app), фавиконки, скриншоты
.github/workflows/deploy.yml — CI: lint → tsc → test → build → deploy-pages
```

## Модули
Проект однокомпонентный — индекс модулей не ведётся; вся логика в `HomePage.tsx` и пяти ui-компонентах.

## Деплой
- Push в `master` → workflow `deploy.yml` → build → артефакт `out/` → GitHub Pages.
- Домен: `public/CNAME` попадает в артефакт; custom domain включается в Settings → Pages.
- Прод-URL: https://blik.app (fallback https://squaretus.github.io/blik-landing/).

### Базовый образ

Отсутствует — проект не использует пред-собранный base image для кэша зависимостей (статический сайт без Docker).
