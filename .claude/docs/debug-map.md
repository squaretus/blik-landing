# Debug Map

<!-- Add entries as recurring bug categories surface:
     ## If X is broken — see file1, file2, serviceY -->

## If Metrika click goals are missing (download_click / github_star_click) — see bugs/metrika-goal-loss.md
Two separate loss mechanisms in `index.html`: same-tab navigation unloads the page
before the `reachGoal` beacon flushes (download link), and the cross-origin badge
lives in a closed shadow root so synchronous `document.activeElement` reads miss the
focus move. `scroll_to_download` still works because it is IntersectionObserver-based.
- `index.html`
- bugs/metrika-goal-loss.md

## If GitHub stars badge looks like an empty `<span>` in the DOM — not a bug
`buttons.github.io/buttons.js` renders the badge into a CLOSED shadow root, so the
`<a class="github-button">`/`<span>` shows no children in the inspector. This is
expected; only debug the badge if it fails to render VISUALLY in the page.
- `index.html` (github-button embed + buttons.js script tag)

