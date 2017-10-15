var config = require(global.appData.rootPath + '/config/config');

module.exports = {
    invaliApiEndpoint: function(req, res, next){
        var returnData = {
            success: false,
            msg: config.messages.api.common.invalidApiEndpoint
        };
        res.status(404).send(returnData);
    }
};