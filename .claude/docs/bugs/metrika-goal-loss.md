# Metrika click goals silently lost (download_click, github_star_click)

## Symptoms
Only `scroll_to_download` (fired by IntersectionObserver) reached Yandex Metrika.
The two click goals `download_click` and `github_star_click` never showed up,
even though the `ym(..., 'reachGoal', ...)` calls ran without errors in the console.

## Scope
- `index.html` (Metrika snippet, download link, GitHub stars badge)

## Root cause
Two independent loss mechanisms, both around the same `reachGoal` calls.

1. `download_click` — the "download" control was a plain `<a>` to the GitHub
   releases page opening in the SAME tab. The browser started unloading the page
   before the queued `ym reachGoal` beacon was flushed, so the goal request was
   dropped mid-navigation.

2. `github_star_click` — the GitHub badge button lives inside a cross-origin
   iframe (`buttons.github.io`) rendered into a CLOSED shadow root. The old
   detector read `document.activeElement` synchronously inside a `window` `blur`
   handler. At that instant focus had NOT yet moved into the iframe, so
   `activeElement` was still `<body>` → the goal condition was never met.

## Reproduction
1. Open the landing page with Metrika debug on.
2. Click "download" → observe navigation to GitHub releases; `download_click`
   missing in the network beacons.
3. Click the GitHub star badge → `github_star_click` never fires.

## Fix
1. `download_click`: add `target="_blank" rel="noopener"` to the download link.
   The current page is no longer unloaded, so the queued beacon is guaranteed to
   send before/independent of the new tab.
2. `github_star_click`: replace the synchronous `activeElement` read with a
   "window lost focus WHILE the pointer is over `.gh-stars`" heuristic — a flag
   toggled by `pointerenter`/`pointerleave` on the badge wrapper, checked in the
   `blur` handler. A `setTimeout(0)` `activeElement` re-check is kept as a
   secondary channel (by then focus has settled into the iframe).

## Regression checks
- [ ] `download_click` beacon is sent when clicking download (new tab opens)
- [ ] `github_star_click` fires when clicking the star badge, not on unrelated
      window blur (alt-tab away with pointer elsewhere must NOT fire it)
- [ ] `scroll_to_download` still fires via IntersectionObserver

## Related files
- `index.html`
