const path = require('path');
dotenv=require("dotenv")
const scriptDir = path.dirname(__filename);
const dotenvPath = path.resolve(scriptDir, '.env');
dotenv=dotenv.config({ path: dotenvPath });

module.exports=dotenv