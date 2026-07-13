# blik-landing

Лэндинг приложения [.blik](https://github.com/squaretus/blik) — контроллера вентиляторов для MacBook Pro на Apple Silicon.

Статический сайт на Next.js 15 (`output: 'export'`), задеплоен на GitHub Pages: **https://blik.app**

## Разработка

```bash
npm install
npm run dev        # dev-сервер
npm test           # тесты (vitest)
npm run build      # static export → out/
```

## Деплой

Пуш в `master` автоматически собирает и публикует сайт через GitHub Actions (`.github/workflows/deploy.yml`).
