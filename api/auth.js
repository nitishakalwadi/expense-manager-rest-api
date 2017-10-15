var jwt = require('jsonwebtoken');

var config = require(global.appData.rootPath + '/config/config');
var authHelper = require(global.appData.rootPath + '/helpers/auth');

var User = require(global.appData.rootPath + '/models/user');

module.exports = {
    signup: function(req, res, next){
        var username = req.body.username;
        var password = req.body.password;
        
        User.findOne({'username': username}).exec()
        .then(function(user){
            if(user){
                res.json({
                    success: false,
                    error: {
                        code: 409,
                        message: 'User already exists'
                    }
                });
            }
            else{
                var newUser = new User();
                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                
                newUser.save()
                .then(function(user){
                    var data = {
                        'user' : {
                            '_id' : user._id
                        }
                    };
                    var token = authHelper.createToken(data);
                    // var token = jwt.sign(data, process.env.JWT_SECRET, {
                    //     expiresIn: process.env.JWT_EXPIRY // expires in secs
                    // });
                    
                    res.json({
                        success: true,
                        data: {
                            token: token
                        }
                    });
                });
            }
        });
    },
    
    authenticate: function(req, res, next){
        var username = req.body.username;
        var password = req.body.password;
        
        User.findOne({'username': username}).select('+password').exec()
        .then(function(user){
            if(!user){
                res.json({
                    success: false, 
                    error: {
                        code: 401,
                        message: 'User not found'
                    }
                });
            }
            else if(user){
                if(!user.validPassword(password, user.password)){
                    res.json({
                        success: false,
                        error: {
                            code: 401,
                            message: 'Invalid credentials'
                        }
                    });
                }
                else{
                    var data = {
                        'user':{
                            '_id' : user._id
                        }
                    };
                    
                    var token = authHelper.createToken(data);
                    if(token){
                        res.json({
                            success: true,
                            data: {
                                token: token
                            }
                        });
                    }
                    else{
                        res.json({
                            success: false
                        });
                    }
                }
            }
        });
    }
};