const {db} = require('../../core/db');
const { Sequelize, Model } = require('sequelize');
const crypto = require('crypto');
const {ParameterException} = require('../../core/http-exception');

const secret = 'lin';

class User extends Model {
  static async verifyEmailLogin(email, password) {
    const user = await this.findOne({
      where: {
        email
      }
    });
    
    if (!user) {
      throw new ParameterException('用户不存在');
    } else {
      const hashPass = crypto.createHmac('sha256', secret).update(password).digest('hex');
      if (hashPass !== user.password) {
        throw new ParameterException('密码不正确');
      }
    }
  }
}

User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: Sequelize.STRING,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val) { // 存入数据库之前, 对密码加密
      const pwd = crypto.createHmac('sha256', secret)
                   .update(val)
                   .digest('hex');
      this.setDataValue('password', pwd);
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize: db,
  tableName: 'user'
})

module.exports = User;