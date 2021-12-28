const userService = require('../service/user.service')
const { md5_hex } = require('../untils/encryption')
class UserVerifyReg {
    async verifyUserInfo(ctx, next) {
        // console.log( ctx.request.body);
        // ctx.req.body ->koa-multer 
        // ctx.request.bodu -> koa-bodyparser
        let { username, password } = ctx.request.body;
        if (!username || !password) {
            return ctx.body = {password_or_user_is_empty:true}
        }
        let [result] = await userService.hasExistUser(username);
        if (result.length) {
            return ctx.body = {user_exit:true}
        }
        await next();
    }
    async Encryption(ctx, next) {
        let { password } = ctx.request.body
        Reflect.set(ctx.request.body, "password", md5_hex(password));
        console.log(password);
        console.log(ctx.request.body.password);
        await next()
    }
}
module.exports = new UserVerifyReg()