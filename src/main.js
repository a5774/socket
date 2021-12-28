const {server} = require('./app/index')
const { TEST_PORT } = require('./app/config')
server.listen(TEST_PORT,()=>{
    console.log( `listen_port:${TEST_PORT}`);
})