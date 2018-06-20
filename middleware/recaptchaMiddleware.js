var config = require(global.appData.rootPath + '/config/config');

var reCAPTCHA = require('recaptcha2');
var recaptcha = new reCAPTCHA({
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    secretKey: process.env.RECAPTCHA_SECRET_KEY
});

module.exports = {
    checkRecaptcha: function(req, res, next){
        recaptcha.validateRequest(req)
        .then(function(){
            // validated and secure
            next();
        })
        .catch(function(errorCodes){
            // invalid
            return res.redirect(req.originalUrl);
            // res.json({formSubmit:false,errors:recaptcha.translateErrors(errorCodes)});// translate error codes to human readable text
        });
    },
    
    checkApiRecaptcha: function(req, res, next){
        recaptcha.validateRequest(req)
        .then(function(){
            // validated and secure
            next();
        })
        .catch(function(errorCodes){
            // invalid
            // return res.redirect(req.originalUrl);
            // res.json({formSubmit:false,errors:recaptcha.translateErrors(errorCodes)});// translate error codes to human readable text
            
            var returnData = {
                success: false,
                msg: config.messages.api.recaptcha.failure,
                class: config.classes.failure
            };
            res.status(401).send(returnData);
        });
    }
}