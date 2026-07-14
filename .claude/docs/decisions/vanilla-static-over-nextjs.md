# Vanilla static HTML over Next.js static export

## Problem
The landing was a Next.js/React/Tailwind app deployed to GitHub Pages via
`next build` static export. For a single marketing page with no server, no data
fetching and no routing, the toolchain (npm install, tsc, eslint, next build)
added build time, a large lockfile, and a dependency surface disproportionate to
the output -- essentially one static page.

## Decision
Drop the entire Next.js stack and ship a single dependency-free `index.html` with
inline `<style>` and `<script>`. Fonts are self-hosted woff2 subsets; media are
pre-encoded AVIF/PNG. The CI "build" is a plain `cp` of an explicit file list into
`_site/`. Tests run on `node --test` with zero dependencies.

## Reasoning
- Zero build/install step: no `node_modules`, no lockfile churn, faster CI.
- The page has no dynamic behavior that needs a framework -- spotlight and star
  effects are ~100 lines of vanilla JS/CSS ported from 21st.dev / bundui.
- Full control over the exact HTML/CSS shipped (no framework hydration, no runtime
  JS bundle) -> smallest possible payload for a static Pages site.
- Removing React/Tailwind removes a whole class of upgrade/security maintenance.

## Consequences
- No component reuse / templating: the page is one file. Acceptable at this size,
  but a second page would need a decision on a minimal generator.
- Publishing new assets requires manually extending the copy list in `deploy.yml`
  (no automatic `out/` directory) -- easy to forget.
- Effects are hand-maintained vanilla ports rather than maintained npm packages.
- Trade accepted deliberately: simplicity and zero-dependency shipping outweigh the
  ergonomics of a framework for a single static page.
