const Sequelize = require('sequelize');
const {database: {dbname, host, port, user, password}} = require('../app/conifg/config.js');

const sequelize = new Sequelize(dbname, user, password, {
  dialect: 'mysql',
  host,
  port,
  timezone: '+08:00',
  define: {
    createAt: 'create_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
});

sequelize.sync();

module.exports = {
  db: sequelize
};