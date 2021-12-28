const jwt = require('jsonwebtoken');
const { md5_hex } = require('../untils/encryption')
const userServive = require('../service/user.service')
const { PUBLIC_KEY } = require('../app/config')
class LoginVerify {
    async verifyLogin(ctx, next) {
        let { username, password } = ctx.request.body
        if (!username || !password) {
            return ctx.body = { password_or_user_is_empty: true }
        }
        let [[result]] = await userServive.hasExistUser(username);
        if (!result) {
            return ctx.body = { user_not_exit: true }
        }
        if (result.password != md5_hex(password)) {
            return ctx.body = { password_err: true }
        }
        Reflect.set(ctx, 'userinfo', { "uid": result.id, "username": result.username })
        await next();
    }
    async verifyToken(ctx, next) {
        // console.log( ctx.headers);
        let { cookie } = ctx.request.headers;
        // console.log( cookie );
        // verify authorization is exists 
        if (!cookie) {
            if(ctx.headers.referer) return ctx.redirect('back')
            else return ctx.redirect('http://127.0.0.1:5050/main/index')  
        }
        let token = cookie.split('=')[1]
        try {
            // token verify 
            const info = jwt.verify(token, PUBLIC_KEY, {
              algorithms: ['RS256','HS256']
            })
            Reflect.set(ctx, 'userInfo', info)
            // console.log( info );
        } catch (err) {
            // console.log( err);
            ctx.redirect('http://127.0.0.1:5050/main/login')  
        }
        await next();
    }
}

module.exports = new LoginVerify();