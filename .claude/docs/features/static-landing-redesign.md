# Static landing redesign

## Goal
Replace the Next.js/React/Tailwind landing with a single dependency-free static
`index.html` served by GitHub Pages, styled per the "1c EDITORIAL" dark theme.

## Scope
Whole project. Old stack removed (`src/`, `public/`, `package.json`, Next/PostCSS/
ESLint configs, `package-lock.json`). Everything now lives in one `index.html`
(inline `<style>` + `<script>`), plus static assets in `fonts/` and `media/`.

## Changes
- Added: `index.html` (single-file page: hero -> 4 AVIF feature demos -> interface
  pile -> CTA -> footer), `fonts/jbm-{regular,italic}-<subset>.woff2` (self-hosted
  JetBrains Mono variable, split by unicode subset), `media/*.avif` +
  `media/iface-*.png`, `tests/landing.test.mjs`.
- Modified: `.github/workflows/deploy.yml` (see Risks), `.gitignore`
  (`source_docs_for_landing/` and media sources ignored), `CNAME`/favicons moved
  from `public/` to repo root.
- Removed: entire Next.js app and its toolchain.

## Key implementation notes
- Feature demos (`media/{overview,temps,resources,charts}.avif`): looping animated
  AVIF made from screen recordings via ffmpeg libsvtav1 with black-bar crop:
  `-vf "crop=2848:1696:112:76,fps=15,scale=1180:-2" -crf 30 -preset 6 -loop 0`.
- Spotlight frame (`.glow` wrapper, vanilla port of 21st.dev spotlight-card): JS
  sets per-card `--gx`/`--gy` from pointer; ring + blur halo drawn by pseudo-
  elements at negative z-index BEHIND the card. Cards must NOT create a stacking
  context, so rotation is applied via `--rot` on `.clip` and the pseudo-elements
  (not on the wrapper). Disabled under `@media (hover: none)` and `<=860px`.
- Star background (vanilla port of bundui stars): 3 `box-shadow` star layers, each
  duplicated at `+2000px` offset for a seamless 2000px loop. Hero animates
  `stars-up`, CTA `stars-down`. `prefers-reduced-motion: reduce` stops animation.
- GitHub stars badge: `buttons.github.io` script embed, `data-color-scheme="dark"`.
  Renders into a CLOSED shadow root, so the `<span>` looks empty in the DOM
  inspector -- not a bug (see debug-map.md).

## Risks
- Publishing a NEW top-level file/dir requires adding it to the explicit copy list
  in `deploy.yml` (`cp -r index.html CNAME favicon-dark.svg favicon-light.svg
  fonts media _site/`), otherwise it silently won't ship to Pages.
- AVIF encoding params are load-bearing for crop alignment; changing source
  resolution needs the `crop=` values recomputed.

## How to test
- [ ] `node --test 'tests/*.test.mjs'` passes (asset links, AVIF `ftypavis`
      sequences, `.glow` wrappers, alt text, badge, CNAME).
- [ ] `python3 -m http.server 8000` -> visual check: hero/CTA stars, spotlight
      follows pointer on desktop, disabled on touch/narrow.
- [ ] Stars badge renders (empty `<span>` in DOM is expected, closed shadow root).

## Related modules
- Single-file project; no `modules/` entry. See decisions/vanilla-static-over-nextjs.md.
