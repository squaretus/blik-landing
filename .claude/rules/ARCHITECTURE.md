# Архитектура blik-landing

## Стек
- Чистый статический сайт: один `index.html`, ноль зависимостей и сборки.
- JetBrains Mono self-hosted (variable woff2), анимированные AVIF-демо, spotlight-эффект на vanilla JS/CSS.
- Тесты: `node --test`, smoke-проверки целостности страницы.
- Хостинг: GitHub Pages (репо `squaretus/blik-landing`), кастомный домен `blik-app.ru`.

## Персистентность
БД нет — статический сайт без серверной части. Правило UUID-PK неприменимо.

## Запуск
```bash
python3 -m http.server 8000       # локальный просмотр
node --test 'tests/*.test.mjs'    # тесты
```

## Структура (верхний уровень)
```
index.html            — вся страница: hero → 5 фич (01–04 AVIF-видео, 05 пачка интерфейсов) → CTA → footer
fonts/                — jbm-{regular,italic}-{subset}.woff2
media/                — overview/temps/resources/charts.avif, iface-{tall,mid,front}.png
favicon-dark.svg, favicon-light.svg, CNAME
tests/landing.test.mjs — ссылки на ассеты, AVIF-секвенции, alt-тексты, CNAME
.github/workflows/deploy.yml — node --test → сборка _site/ → deploy-pages
source_docs_for_landing/ — исходники медиа (не в git)
```

## Модули
Проект однофайловый — индекс модулей не ведётся; вся страница и её стили/скрипт в `index.html`.

## Деплой
- Push в `master` → workflow `deploy.yml` → тесты → `_site/` из явного списка файлов → GitHub Pages.
- Домен: `CNAME` в корне попадает в артефакт; custom domain включён в Settings → Pages.
- Прод-URL: https://blik-app.ru (fallback https://squaretus.github.io/blik-landing/).

### Базовый образ

Отсутствует — проект не использует пред-собранный base image для кэша зависимостей (статический сайт без Docker).
