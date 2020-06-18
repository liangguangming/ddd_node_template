import Koa from 'koa';
import koaBody from 'koa-body';
import router from './routers/router';

const app = new Koa();

app.use(koaBody());

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('launch successful');
});
