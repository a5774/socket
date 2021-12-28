const { poolPromise } = require('../app/database');
class UserService {
    async userCreate(username, password) {
        let statementPrep = `INSERT INTO user (username,password) VALUES (?,?)`
        return await poolPromise.execute(statementPrep, [username, password]);
    }
    async hasExistUser(username) {
        let statementPrep = `SELECT * FROM user WHERE username = ?;`
        return await poolPromise.execute(statementPrep, [username]);
    }
}
module.exports = new UserService();
