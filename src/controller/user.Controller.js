const userService = require('../service/user.service');
class UserController {
    async userCreate(ctx, next) {
        let { username, password } = ctx.request.body;
        let [result] = await userService.userCreate(username, password);
        ctx.body = {done:true};
    }

    async parserExtend(ctx,next){
            console.log( ctx.request.body );
            console.log( ctx.headers);
            // ctx.disableBodyParser = true;
            // console.log( ctx.request.rawBody);
            await next()
    }
}
module.exports = new UserController()