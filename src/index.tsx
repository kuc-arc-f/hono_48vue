import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { Database } from '@cloudflare/d1'
import { renderToString } from 'react-dom/server';
//
interface Env {
  DB: Database
}
//
const app = new Hono();
app.use("/*", cors());
//
import App from './pages/App';
/*
API
*/
app.get('/api/test1', async (c) => { 
  const resulte = {ret:"OK", msg:"" };
  return c.json(resulte);
});
app.get('/api/test2', async (c) => {
  const result = await c.env.DB.prepare(`SELECT * FROM todos ORDER BY id DESC`).all();
console.log(result.results);
  return c.html(
    renderToString(
    <div>
      <h1>Hello!</h1>
      {JSON.stringify(result.results)}
    </div>
    )
  )
});

//
app.get('/*', async (c) => { 
  return c.html(renderToString(App([])));
});

export default app
