var jwt = require('jsonwebtoken');

var config = require(global.appData.rootPath + '/config/config');
var authHelper = require(global.appData.rootPath + '/helpers/auth');

var User = require(global.appData.rootPath + '/models/user');

module.exports = {

    verifyToken: function(req, res, next){
        var bearerHeader = req.headers["authorization"];
        var token = authHelper.getToken(bearerHeader);
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err){
                res.json({
                    success: false,
                    error: {
                        code: 401,
                        message: 'Unauthorized access'
                    }
                });
            }
            else{
                var userId = decoded.data.user._id;
                User.findById(userId).exec()
                .then(function(user){
                    if(user){
                        user.password = "";
                        req.user = user;
                        return next();
                    }
                    else{
                        res.json({
                            success: false,
                            error: {
                                code: 404,
                                message: 'User not found'
                            }
                        });
                    }
                });
            }
        });
    }
}
