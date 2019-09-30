const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const catchError = require('./middlewares/exception');

const InitManager = require('./core/init');

const app = new Koa();
app.use(catchError);  // 全局异常捕获
app.use(bodyParser()); // 解析body中间件, 使用 ctx.request.body获取

// 初识化路由
InitManager.initCore(app);



app.listen(3000);
console.log('server is runing at port 3000');
