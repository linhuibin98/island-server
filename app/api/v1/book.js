const Router = require('koa-router');

const router = new Router();

router.get('/book', async (ctx, next) => {
  ctx.body = ctx.request.query;
  await next();
});

router.post('/book', async (ctx, next) => {
  ctx.body = ctx.request.body;
  await next();
});

module.exports = router;