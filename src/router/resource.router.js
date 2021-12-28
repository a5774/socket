const Router = require('koa-router')
const resourceRouter = new Router({prefix:"/main"})
const {index,login,socket,userflag} = require('../controller/resource.Controller')
const { verifyToken, } = require('../middleWare/login.verify')
resourceRouter.get('/index',index)
resourceRouter.get('/login',login)
resourceRouter.get('/chat',verifyToken,socket)
resourceRouter.get('/userflag',verifyToken,userflag)
// var isMobile = /AppleWebKit.*Mobile.*/i.test(navigator.userAgent)

module.exports = resourceRouter

