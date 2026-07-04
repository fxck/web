import test from 'node:test';
import assert from 'node:assert/strict';
import { renderPage } from '../src/render.js';

test('renderPage lists todo titles', () => {
  const html = renderPage([
    { id: 1, title: 'first task', done: false },
    { id: 2, title: 'second task', done: true },
  ]);
  assert.match(html, /first task/);
  assert.match(html, /second task/);
  assert.match(html, /class="done"/);
});

test('renderPage escapes HTML in titles', () => {
  const html = renderPage([{ id: 1, title: '<script>x</script>', done: false }]);
  assert.doesNotMatch(html, /<script>x<\/script>/);
  assert.match(html, /&lt;script&gt;/);
});

test('renderPage shows an error message when given one', () => {
  const html = renderPage([], 'api responded 502');
  assert.match(html, /Could not load todos/);
  assert.match(html, /api responded 502/);
});
