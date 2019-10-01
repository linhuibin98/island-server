// 封装自定义已知error库

/**
 * @class HttpException
 * @extends {Error}
 * 
 * @param {string} msg
 * @param {number} errorCode
 * @param {number} status
 */
class HttpException extends Error {
  constructor(msg = '服务器错误', errorCode = 10000, status = 400) {
    super(msg);
    this.msg = msg;
    this.errorCode = errorCode;
    this.status = status;
  }
}

// 参数错误 类
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.msg = msg || '参数错误';
    this.errorCode = errorCode || 10000;
    this.status = 400;
  }
}

module.exports = {
  HttpException,
  ParameterException
};