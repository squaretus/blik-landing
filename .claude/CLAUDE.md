# blik-landing — лэндинг приложения Blik (GitHub Pages)

## Стек
- Next.js 15 (App Router, `output: 'export'` — чистая статика), React 19
- Tailwind CSS v4 (CSS-first, `@import "tailwindcss"` в `globals.css`, без tailwind.config)
- framer-motion (анимации секций), vitest + Testing Library (тесты)
- Деплой: GitHub Actions → GitHub Pages, домен `blik.app` (`public/CNAME`)

## Команды
```bash
npm run dev        # dev-сервер
npm run build      # static export → out/
npm test           # vitest run
npm run lint       # eslint
npx tsc --noEmit   # typecheck
npm start          # npx serve out — локальный просмотр экспорта
```

## Структура
```
src/app/            — layout (шрифты, theme-init script), page (→ HomePage), globals.css, sitemap, robots
src/components/landing/HomePage.tsx — весь лэндинг (Navbar, Hero, Features, Showcase, CTA, Footer)
src/components/ui/  — ThemeToggle, NeonBorder, Logo, Button, Spinner
src/lib/utils.ts    — cn()
public/             — CNAME, фавиконки, landing/assets/ (скриншоты)
.github/workflows/deploy.yml — lint+tsc+test+build → Pages
```

## Правила
- Бэкенда НЕТ: это статический сайт. Никаких fetch к API, auth, аналитики.
- Кнопки «Скачать» ведут на `https://github.com/squaretus/blik/releases/latest` — не менять на относительные пути.
- `sitemap.ts`/`robots.ts` обязаны иметь `export const dynamic = 'force-static'` (иначе `output: 'export'` падает).
- `next/image` работает только с `images.unoptimized: true` (см. `next.config.js`).
- Тема: инлайн-скрипт в `layout.tsx` (localStorage + prefers-color-scheme) до гидрации; фавиконка меняется вместе с темой.
- Коммиты: см. память проекта — в этом репо коммиты идут с трейлером `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` (явное требование пользователя).
