const Router = require('koa-router');
const {ParameterException} = require('../../../core/http-exception');
const {isInt} = require('validator');

const router = new Router();

router.get('/classic', async (ctx, next) => {
  ctx.body = 'classic';
  await next();
});

router.post('/classic/:type', async (ctx, next) => {
  let params = ctx.params;
  let query = ctx.request.query;
  let body = ctx.request.body;
  console.log('params', '===', params);
  console.log('query', '===', query);
  console.log('body', '===', body);
  if (!isInt(ctx.params.type)) {
    ctx.body = new ParameterException();
  } else {
    ctx.body = 'success';
  }
  await next();
});

module.exports = router;