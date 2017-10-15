var jwt = require('jsonwebtoken');

var config = require(global.appData.rootPath + '/config/config');

module.exports = {
    getToken: function(authorizationParam){
        if(authorizationParam) {
            var bearer = authorizationParam.split(" ");
            var token = bearer[1];
            return token;
        }
        else{
            return false;
        }
    },

    createToken: function(data){
        var encodeData = {
            'data': data
        };
        var token = jwt.sign(encodeData, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY // expires in secs
        });
        return token;
    },

    verifyToken: function(token){
        if(!token){
            return false;
        }

        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err){
                return false;
            }
            else{
                return decoded;
            }
        });
    }
}