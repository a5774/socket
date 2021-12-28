const fs = require('fs');
const Router = require('koa-router')
const parser = require('koa-bodyparser');
const { verifyUserInfo, Encryption } = require('../middleWare/user.verify')
const { userCreate, parserExtend } = require('../controller/user.Controller')
const userRouter = new Router({ prefix: '/user' });

userRouter.post('/', parser({
    // extendTypes
    enableTypes:['text','json','xml','form'],
    // formLimit
}), parserExtend, verifyUserInfo, Encryption, userCreate);




userRouter.get('/fetch',(ctx,next)=>{
    ctx.type = 'text/html'
    ctx.cookies.set('origin','fetch',{
        maxAge:400*1000
    })
    ctx.set('anyheader',"any")
    console.log( ctx.get('content-type'));
    // check content-type is receiver type 
    console.log( ctx.response.is('.html') );
    ctx.body = fs.createReadStream('./static/fetch.html')
})

userRouter.get('/socket',(ctx,next)=>{
    ctx.type = 'text/html'
    ctx.body = fs.createReadStream('./static/index.html')
})
module.exports = userRouter