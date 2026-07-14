# blik-landing

Лэндинг приложения [blik](https://github.com/squaretus/blik) — мониторинга температур и ресурсов Mac на Apple Silicon.

Чистая статика без сборки и зависимостей, задеплоена на GitHub Pages: **https://blik-app.ru**

## Структура

```
index.html        — вся страница (стили и скрипт инлайном)
fonts/            — JetBrains Mono (variable woff2, по сабсетам)
media/            — зацикленные анимированные AVIF (демо вкладок) и PNG интерфейсов
favicon-*.svg     — фавиконки под светлую/тёмную тему
CNAME             — кастомный домен blik-app.ru
tests/            — smoke-тесты страницы (node --test, без зависимостей)
```

## Разработка

```bash
python3 -m http.server 8000       # локальный просмотр: http://localhost:8000
node --test 'tests/*.test.mjs'    # тесты
```

## Медиа

Анимированные AVIF генерируются из экранных записей (`.mov`) так:

```bash
ffmpeg -i запись.mov -vf "fps=15,scale=1180:-2" -c:v libsvtav1 -crf 30 -preset 6 -an -loop 0 media/имя.avif
```

`-loop 0` — бесконечное зацикливание секвенции.

## Деплой

Пуш в `master` прогоняет тесты и публикует сайт через GitHub Actions (`.github/workflows/deploy.yml`).
