const cryto = require('crypto');
class Encryption {
    md5_hex(password) {
        const md5 = cryto.createHash('md5');
        return md5.update(password).digest('hex');
    }
}
module.exports = new Encryption()