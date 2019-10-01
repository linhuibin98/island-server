const Router = require('koa-router');
// const {HttpException, ParamterExcption}= require('../../../core/http-exception');

const router = new Router();

router.get('/book', async (ctx, next) => {
  ctx.body = ctx.request.query;
  // let error = new HttpException('捕捉具体错误信息', 10001, 400);
  // error.errorCode = 10001;
  // error.status = 400;
  // error.requestUrl = `${ctx.method} ${ctx.path}`;
  // throw new HttpException('捕捉具体错误信息', 10001, 400);
  await next();
});

router.post('/book', async (ctx, next) => {
  ctx.body = ctx.request.body;
  await next();
});

module.exports = router;