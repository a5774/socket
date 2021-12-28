const fs = require('fs');
class ResourceController{
    async index(ctx,next){
        ctx.type = 'text/html;charset=utf-8';
        ctx.body = fs.createReadStream('./public/index.html');
    }
    async login(ctx,next){
        ctx.type = 'text/html;charset=utf-8';
        ctx.body = fs.createReadStream('./public/login.html');
    }
    async socket(ctx,next){
        ctx.type = 'text/html;charset=utf-8';
        ctx.body = fs.createReadStream('./public/socket.html');
    }
    async userflag(ctx,next){
        ctx.body = ctx.userInfo
    }
}
module.exports = new ResourceController()