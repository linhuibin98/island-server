const Router = require('koa-router');
const {ParameterException} = require('../../../core/http-exception');
const {isInt} = require('validator');

const router = new Router();

router.get('/classic', async (ctx, next) => {
  ctx.body = 'classic';
  await next();
});

router.post('/classic/:type', async (ctx, next) => {
  if (!isInt(ctx.params.type)) {
    ctx.body = new ParameterException();
  } else {
    ctx.body = 'success';
  }
  await next();
});

module.exports = router;