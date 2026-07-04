// @ts-check
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { validateTodo } from '@fxck/contracts';
import { renderPage } from './render.js';

const app = new Hono();

/** Base URL of the api service, reachable over the Zerops internal network. */
const API_URL = process.env.API_URL ?? 'http://apidev:3000';

app.get('/', async (c) => {
  try {
    const res = await fetch(`${API_URL}/todos`);
    if (!res.ok) {
      throw new Error(`api responded ${res.status}`);
    }
    const data = await res.json();
    const todos = Array.isArray(data) ? data.filter(validateTodo) : [];
    return c.html(renderPage(todos));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return c.html(renderPage([], message), 502);
  }
});

app.get('/health', (c) => c.json({ ok: true }));

const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port, hostname: '0.0.0.0' }, (info) => {
  console.log(`web listening on :${info.port} (api at ${API_URL})`);
});
