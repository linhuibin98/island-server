const Router = require('koa-router');
const {PositiveIntegerValidator} = require('../../validators/validator.js');

const router = new Router();

router.get('/classic', async (ctx, next) => {
  ctx.body = 'classic';
  await next();
});

router.post('/classic/:type', async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx);
  console.log(v.get('ctx.params'));
  await next();
});

module.exports = router;