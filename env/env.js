var node_env = process.env.NODE_ENV || 'dev';

require('dotenv').config({
    path: global.appData.rootPath + '/env/' + node_env + '.env'
});