const Router = require('koa-router');

const router = new Router();

router.get('/classic', async (ctx, next) => {
  ctx.body = 'classic';
  await next();
});

module.exports = router;