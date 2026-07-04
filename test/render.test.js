import test from 'node:test';
import assert from 'node:assert/strict';
import { renderPage } from '../src/render.js';

test('renderPage lists todo titles and priorities', () => {
  const html = renderPage([
    { id: 1, title: 'first task', done: false, priority: 'high' },
    { id: 2, title: 'second task', done: true, priority: 'low' },
  ]);
  assert.match(html, /first task/);
  assert.match(html, /second task/);
  assert.match(html, /class="done"/);
  assert.match(html, /class="prio prio-high"/);
  assert.match(html, /class="prio prio-low"/);
});

test('renderPage escapes HTML in titles', () => {
  const html = renderPage([
    { id: 1, title: '<script>x</script>', done: false, priority: 'medium' },
  ]);
  assert.doesNotMatch(html, /<script>x<\/script>/);
  assert.match(html, /&lt;script&gt;/);
});

test('renderPage shows an error message when given one', () => {
  const html = renderPage([], 'api responded 502');
  assert.match(html, /Could not load todos/);
  assert.match(html, /api responded 502/);
});

test('renderPage shows the due date when present and omits it when null', () => {
  const html = renderPage([
    { id: 1, title: 'has due', done: false, priority: 'low', dueDate: '2026-08-01' },
    { id: 2, title: 'no due', done: false, priority: 'low', dueDate: null },
  ]);
  assert.match(html, /class="due"/);
  assert.match(html, /due 2026-08-01/);
  // Only the row with a dueDate should emit a due span.
  assert.equal((html.match(/class="due"/g) || []).length, 1);
});
