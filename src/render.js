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
            `${escapeHtml(t.title)} ` +
            `<span class="prio prio-${escapeHtml(t.priority)}">${escapeHtml(t.priority)}</span>` +
            (t.dueDate ? ` <span class="due">due ${escapeHtml(t.dueDate)}</span>` : '') +
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
    .prio { font-size: .7rem; text-transform: uppercase; padding: .1rem .4rem; border-radius: .3rem; margin-left: .3rem; }
    .prio-high { background: #fde2e1; color: #b00; }
    .prio-medium { background: #fff3d6; color: #8a6d00; }
    .prio-low { background: #e3f0ff; color: #24538a; }
    .due { font-size: .7rem; color: #555; margin-left: .3rem; }
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
