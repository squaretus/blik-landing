import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');

test('все локальные ссылки на ассеты указывают на существующие файлы', () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((u) => !/^(https?:|#|mailto:)/.test(u));
  const fontRefs = [...html.matchAll(/url\("([^"]+)"\)/g)].map((m) => m[1]);
  const all = [...refs, ...fontRefs];
  assert.ok(all.length > 0, 'на странице должны быть локальные ассеты');
  for (const ref of all) {
    assert.ok(existsSync(join(root, ref)), `отсутствует файл: ${ref}`);
  }
});

test('видео-слоты заполнены анимированными AVIF в spotlight-обёртке', () => {
  for (const name of ['overview', 'temps', 'resources', 'charts']) {
    const re = new RegExp(`<div class="glow"><figure class="clip"><img src="media/${name}\\.avif"`);
    assert.match(html, re, `${name}.avif не обёрнут в .glow`);
  }
  assert.ok(!html.includes('avif · media/'), 'остался текст плейсхолдера из макета');
});

test('AVIF-файлы — настоящие зацикленные секвенции (ftypavis)', () => {
  for (const name of ['overview', 'temps', 'resources', 'charts']) {
    const buf = readFileSync(join(root, 'media', `${name}.avif`));
    assert.equal(buf.subarray(4, 12).toString('latin1'), 'ftypavis', `${name}.avif не image sequence`);
  }
});

test('в пункте «интерфейсы» три картинки со spotlight-обёрткой', () => {
  for (const name of ['iface-tall', 'iface-mid', 'iface-front']) {
    const re = new RegExp(`<div class="glow glow--[a-z]+">\\s*<figure class="clip"><img src="media/${name}\\.png"`);
    assert.match(html, re, `${name}.png не обёрнут в .glow`);
  }
});

test('у всех изображений есть alt-текст (кроме декоративного пикселя метрики)', () => {
  for (const [tag] of html.matchAll(/<img [^>]*>/g)) {
    if (tag.includes('mc.yandex.ru/watch')) continue;
    assert.match(tag, / alt="[^"]+"/, `img без alt: ${tag.slice(0, 80)}`);
  }
});

test('звёздный фон: на hero — вверх, в CTA — перевёрнутый (вниз)', () => {
  assert.match(html, /<header class="chasm chasm--hero">\s*<div class="stars" aria-hidden="true">/);
  assert.match(html, /<section class="chasm chasm--cta">\s*<div class="stars stars--down" aria-hidden="true">/);
});

test('в шапке есть тёмный бадж GitHub stars репозитория squaretus/blik', () => {
  assert.match(html, /<a class="github-button" href="https:\/\/github\.com\/squaretus\/blik" data-color-scheme="dark"[^>]*data-show-count="true"/);
  assert.match(html, /<script async defer src="https:\/\/buttons\.github\.io\/buttons\.js"><\/script>/);
});

test('Яндекс.Метрика: счётчик 110731912 и цели подключены', () => {
  assert.match(html, /mc\.yandex\.ru\/metrika\/tag\.js\?id=110731912/);
  assert.match(html, /ym\(110731912, 'init'/);
  assert.match(html, /<noscript><div><img src="https:\/\/mc\.yandex\.ru\/watch\/110731912"/);
  for (const goal of ['download_click', 'scroll_to_download', 'github_star_click']) {
    assert.ok(html.includes(`'${goal}'`), `нет цели ${goal}`);
  }
});

test('CNAME указывает на blik-app.ru', () => {
  assert.equal(readFileSync(join(root, 'CNAME'), 'utf8').trim(), 'blik-app.ru');
});

test('SEO: robots.txt открыт для всех и ссылается на sitemap', () => {
  const robots = readFileSync(join(root, 'robots.txt'), 'utf8');
  assert.match(robots, /User-agent: \*\nAllow: \//);
  assert.match(robots, /Sitemap: https:\/\/blik-app\.ru\/sitemap\.xml/);
});

test('SEO: sitemap.xml содержит главную страницу', () => {
  const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
  assert.match(sitemap, /<loc>https:\/\/blik-app\.ru\/<\/loc>/);
});

test('SEO: canonical, og:image и валидный JSON-LD', () => {
  assert.match(html, /<link rel="canonical" href="https:\/\/blik-app\.ru\/">/);
  assert.match(html, /<meta property="og:image" content="https:\/\/blik-app\.ru\/media\/iface-front\.png">/);
  assert.match(html, /<meta name="robots" content="index, follow[^"]*">/);
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(ld, 'нет JSON-LD');
  const data = JSON.parse(ld[1]);
  assert.equal(data['@type'], 'SoftwareApplication');
  assert.equal(data.operatingSystem, 'macOS');
});

test('SEO: robots.txt и sitemap.xml попадают в деплой', () => {
  const deploy = readFileSync(join(root, '.github/workflows/deploy.yml'), 'utf8');
  assert.match(deploy, /cp -r [^\n]*robots\.txt[^\n]*sitemap\.xml[^\n]*_site\//);
});
