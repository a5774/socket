const Router = require('koa-router');
const parser = require('koa-bodyparser')
const loginRouter = new Router({prefix:"/login"})
const { verifyLogin } = require('../middleWare/login.verify')
const { releaseToken } = require('../controller/login.Controller')
loginRouter.post('/',parser(),verifyLogin,releaseToken)

module.exports = loginRouter