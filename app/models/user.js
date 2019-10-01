const {db} = require('../../core/db');
const { Sequelize, Model } = require('sequelize');
const crypto = require('crypto');

const secret = 'lin';

class User extends Model {

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