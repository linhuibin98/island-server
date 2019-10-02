const {LinValidator, Rule} = require('../../core/lin-validator-v2');
const User = require('../models/user.js');
const {loginType} = require('../lib/enum.js');

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.page = [
      new Rule('isInt', 'page必须为整数')
    ]
  }
}

class RegisterFormValidator extends LinValidator {  // 注册信息校验
  constructor() {
    super();
    this.nickname = [
      new Rule('isLength', '昵称最少4位, 最多16位', {
        min: 4,
        max: 16
      }),
      new Rule('matches', '昵称只能包含数字、字母、下划线和减号', /^[a-zA-Z0-9_-]{4,16}$/),
    ],
    this.pass1 = [
      new Rule('isLength', '密码最少为8个字符,最多16个字符', {
        min: 8,
        max: 16
      }),
      new Rule('matches', '至少8个字符，至少一个字母和一个数字', /\S/),
    ],
    this.pass2 = this.pass1,
    this.email = [
      new Rule('isEmail', '邮箱格式不正确')
    ]
  }

  async validateNickname(vals) {  // 自定义校验必须以validate开头,
    const {nickname} = vals.body 
    const user = await User.findOne({
      where: {
        nickname
      }
    });
    if (user) {
      throw new Error('该昵称已存在');
    }
  }

  async validateEmail(vals) {
    const {email} = vals.body 
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (user) {
      throw new Error('该邮箱已注册');
    }
  }

  validatePassword(vals) {   
    let {pass1, pass2} = vals.body;
    if (pass1 !== pass2) {
      throw new Error('两次输入的密码不一致');
    }
  }
}

class TokenValidator extends LinValidator {  // 登录校验
  constructor() {
    super();
    this.account = [ // 账号校验, 可以为 用户名、邮箱、手机号
      new Rule('isLength', '账号不符合规则', {
        min: 4,
        max: 16
      })
    ],
    this.secret = [ // 密码, 若为手机可以验证码直接登录
      // 1. 可以为空, 可以不传
      // 是必须要传入的吗？
      // web 账号+密码//登录多元化小程序密码
      //微信打开小程序合法用户
      //web account +secret
      //account
      //手机登录
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128
      })
    ]
  }

  validateLoginType(vals) { // 登录方式校验
    let {type} = vals.body;
    if (!type) {
      throw new Error('type是必须的参数');
    }
    
    if (!loginType.isThisType(type)) {
      throw new Error('参数不合法')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterFormValidator,
  TokenValidator
}