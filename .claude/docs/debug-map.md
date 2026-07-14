# Debug Map

<!-- Add entries as recurring bug categories surface:
     ## If X is broken — see file1, file2, serviceY -->

## If GitHub stars badge looks like an empty `<span>` in the DOM — not a bug
`buttons.github.io/buttons.js` renders the badge into a CLOSED shadow root, so the
`<a class="github-button">`/`<span>` shows no children in the inspector. This is
expected; only debug the badge if it fails to render VISUALLY in the page.
- `index.html` (github-button embed + buttons.js script tag)

