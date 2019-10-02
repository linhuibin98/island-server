const {LinValidator, Rule} = require('../../core/lin-validator-v2');
const User = require('../models/user.js');

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.page = [
      new Rule('isInt', 'page必须为整数')
    ]
  }
}

class RegisterFormValidator extends LinValidator {
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

module.exports = {
  PositiveIntegerValidator,
  RegisterFormValidator
}