// @ts-check
import { API_VERSION } from '@fxck/contracts';

/**
 * @typedef {import('@fxck/contracts').Todo} Todo
 */

/**
 * Escape a string for safe interpolation into HTML text/attributes.
 * @param {string} s
 * @returns {string}
 */
function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render the todo list page.
 * @param {Todo[]} todos
 * @param {string | null} [error]
 * @returns {string}
 */
export function renderPage(todos, error = null) {
  const body = error
    ? `<p class="error">Could not load todos: ${escapeHtml(error)}</p>`
    : `<ul>${todos
        .map(
          (t) =>
            `<li class="${t.done ? 'done' : 'todo'}">` +
            `<input type="checkbox" disabled ${t.done ? 'checked' : ''}> ` +
            `${escapeHtml(t.title)}` +
            `</li>`
        )
        .join('')}</ul>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Todos</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 3rem auto; }
    li.done { color: #888; text-decoration: line-through; }
    .error { color: #b00; }
    footer { margin-top: 2rem; color: #888; font-size: .85rem; }
  </style>
</head>
<body>
  <h1>Todos</h1>
  ${body}
  <footer>contract ${escapeHtml(API_VERSION)}</footer>
</body>
</html>`;
}
