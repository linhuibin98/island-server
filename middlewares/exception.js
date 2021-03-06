// 捕捉错误, 并判断是否是已知错误
const {HttpException} = require('../core/http-exception');

const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof HttpException) { // 判断捕捉的错误是否是已知错误, 是：则向客户端返回错误信息
      ctx.status = error.code;
      ctx.body = {
        message: error.msg,
        errorCode: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`
      };
    } else { // 处理未知错误
      console.log(error);
      ctx.status = 500;
      ctx.body = {
        msg: error.message,
        errorCode: 999,
        requestUrl: `${ctx.method} ${ctx.path}` 
      }
    }
  }
}

module.exports = catchError;