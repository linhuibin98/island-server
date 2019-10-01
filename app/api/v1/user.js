const Router = require('koa-router');
const User = require('../../models/user');
const {RegisterFormValidator} = require('../../validators/validator.js');
const {Success} = require('../../../core/http-exception');

const router = new Router({
  prefix: '/v1/user'
});

router.post('/register', async (ctx, next) => {
  // let bodyText = '';
  // if (!/^[a-zA-Z0-9.]{6,24}$/.test(nickname)) {
  //   bodyText = '昵称格式不正确';
  // }
  // if (!/^\S{8,16}$/.test(pass1)) {
  //   if (bodyText === '') {
  //     bodyText = '密码格式不正确'
  //   } else {
  //     bodyText += ', 密码格式不正确'
  //   }
  // }
  // if (pass1 !== pass2) {
  //   if (bodyText === '') {
  //     bodyText = '两次输入的密码不一致'
  //   } else {
  //     bodyText += ', 两次输入的密码不一致'
  //   }
  // }
  // if (!isEmail(email)) {
  //   if (bodyText === '') {
  //     bodyText = '邮箱格式不正确'
  //   } else {
  //     bodyText += ', 邮箱格式不正确'
  //   }
  // }
  // if (bodyText === '') {
  //   User.create({
  //     nickname,
  //     password: pass2,
  //     email
  //   });
  //   bodyText = '注册成功';
  // }
  // ctx.body = bodyText;
  const v = await new RegisterFormValidator().validate(ctx);

  let {nickname, pass2, email} = v.get('body');

  User.create({  // 校验通过写入数据库中
    nickname,
    password: pass2,
    email
  });
  throw new Success('注册成功');

});

module.exports = router;