const dotenv = require('dotenv')
const fs = require('fs');
const path = require('path');
// read cwd path .env file ,add to process.env
dotenv.config();
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./KEYS/private.key'),{encoding:'utf-8',flag:'r+'})
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./KEYS/public.key'),{encoding:'utf-8',flag:'r+'})
module.exports = {
    TEST_PORT,
    SQl_PROT,
    SQL_HOST,
    SQL_DATABASE,
    SQL_USER,
    SQL_PASSWORD,
} = process.env
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;

