// 捕捉错误, 并判断是否是已知错误
const {HttpException} = require('../core/http-exception');

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof HttpException) { // 判断捕捉的错误是否是已知错误, 是：则向客户端返回错误信息
      ctx.body = {
        message: error.message,
        code: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`
      };
      ctx.status = error.status;
    } else { // 处理未知错误
      ctx.body = {
        msg: '未知错误',
        errorCode: 999,
        requestUrl: `${ctx.method} ${ctx.path}` 
      }
      ctx.status = 500;
    }
  }
}

module.exports = catchError;