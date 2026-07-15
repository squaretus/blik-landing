# blik-landing

Лендинг приложения Blik: один статический `index.html` (стили и скрипт инлайном), без фреймворков, сборки и npm-зависимостей. Хостинг — GitHub Pages (деплой через GitHub Actions), домен `blik-app.ru`.

## Запуск

```bash
python3 -m http.server 8000       # локальный просмотр
node --test 'tests/*.test.mjs'    # тесты (без зависимостей)
ffmpeg -i in.mov -vf "fps=15,scale=1180:-2" -c:v libsvtav1 -crf 30 -preset 6 -an -loop 0 media/out.avif  # видео → AVIF
```

## Документация

- Карта проекта (стек, команды, структура, деплой): `.claude/rules/ARCHITECTURE.md`
- Операционная память (features / bugs / decisions): `.claude/docs/`

@.claude/rules/ARCHITECTURE.md

## Соглашения

- Бэкенда НЕТ: статический сайт. Никаких fetch к API, auth, аналитики.
- Кнопка «скачать blik» ведёт на `https://github.com/squaretus/blik/releases/latest` — не менять на относительные пути.
- Дизайн: тёмная тема (#05070c/#0A0D14), акцент #2FB3B8, всё в JetBrains Mono. Единственная страница — `index.html`, правки стилей вносить в его `<style>`.
- Spotlight-рамка (`.glow`) — одна общая обёртка для ВСЕХ медиа-карточек (видео и картинки интерфейсов), vanilla-адаптация 21st.dev spotlight-card: JS ставит `--gx/--gy` per-card, псевдоэлементы с отрицательным z-index рисуют кольцо и blur-ореол ПОЗАДИ карточек (видны только по внешним краям). Для этого `.glow` не создаёт stacking context: без transform/z-index, поворот в куче — на `.clip` и псевдоэлементах через `--rot`. Отключена на `hover: none` и в мобильной раскладке (≤860px).
- Звёздный фон (`.stars`) — vanilla-адаптация 21st.dev bundui stars: JS генерирует 3 слоя box-shadow-звёзд (1/2/3px), бесшовный цикл 2000px. На hero звёзды плывут вверх, в CTA — вниз (`.stars--down`). Подложка секций (радиальные градиенты) не меняется. Отключается при `prefers-reduced-motion`.
- Бадж GitHub stars — официальный embed `buttons.github.io/buttons.js` (`data-color-scheme="dark"`); рендерится в closed shadow root, поэтому в DOM выглядит пустым `<span>` — это норма.
- Исходники медиа лежат в `source_docs_for_landing/` (в .gitignore, в репо не коммитятся) — в `media/` кладутся уже сконвертированные файлы.
- Воркфлоу собирает `_site/` из явного списка файлов (`index.html CNAME robots.txt sitemap.xml favicon.ico favicon-*.png apple-touch-icon.png favicon-*.svg fonts media` и IndexNow-ключ) — новые публикуемые файлы/каталоги нужно добавить в этот список в `deploy.yml`.
- Favicon: растровые `favicon.ico` (16/32/48), `favicon-96x96.png`, `favicon-192x192.png`, `apple-touch-icon.png` (180) генерятся из `favicon-dark.svg` через `../icon/blik/render-svg-to-png.swift` (NSImage) + Pillow для сборки `.ico`. Нужны, т.к. YandexBot/Googlebot дёргают `/favicon.ico` и плохо переваривают SVG-фавиконки.
- Коммиты: см. память проекта — в этом репо коммиты идут с трейлером `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` (явное требование пользователя).
