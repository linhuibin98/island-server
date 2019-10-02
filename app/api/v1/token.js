const Router = require('koa-router');
const {ParameterException} = require('../../../core/http-exception');
const {TokenValidator} = require('../../validators/validator.js');
const {loginType: {USER_EMAIL, USER_MINI_PROGRAM, USER_MOBILE, ADMIN_EMAIL}} = require('../../lib/enum.js');
const User = require('../../models/user.js');

const router = new Router({
  prefix: '/v1/token'
});

router.post('/', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx);
  const {type, secret, account} = v.get('body');

  // type 判断登录方式
  switch(type) {
    case USER_EMAIL: 
      await emailLogin(account, secret);
      ctx.body = '登录成功'
      break;
    case USER_MINI_PROGRAM:
      break;
    case USER_MOBILE:
      break;
    case ADMIN_EMAIL:
      break;
    default: 
      break;
  }

  async function emailLogin(email, secret) {
    if (!secret) {
      throw new ParameterException('请输入密码');
    }
    await User.verifyEmailLogin(email, secret);
  }
})

module.exports = router;