const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config')
class LoginController {
    async releaseToken(ctx,next) {
        let payload = ctx.userinfo
        let token = jwt.sign(payload,PRIVATE_KEY,{
            expiresIn:1000*60*60,
            algorithm:'RS256'
        })
        ctx.body = {token}
    }
}
module.exports = new LoginController()