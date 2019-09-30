const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManager {
  static initCore(app) {
    InitManager.initLoadRouter(app);
  }

  static initLoadRouter(app) {
    requireDirectory(module, `${process.cwd()}/app/api/v1`, { visit: visitor });
    function visitor(router) {
      if (router instanceof Router) {
        app.use(router.routes());
      }
    }
  }

}

module.exports = InitManager;