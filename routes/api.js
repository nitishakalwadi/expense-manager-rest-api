module.exports = function(app) {
    var express = require('express');
    var router  = express.Router();
    
    var middlewareRoutes = require(global.appData.rootPath + '/config/middlewareRoutes');
    
    //get middlewares
    var authMiddleware          = require(global.appData.rootPath + '/middleware/authMiddleware');
    var recaptchaMiddleware     = require(global.appData.rootPath + '/middleware/recaptchaMiddleware');

    //get conrtollers
    var commonApiController     = require(global.appData.rootPath + '/api/common');
    var authApiController       = require(global.appData.rootPath + '/api/auth');
    var expenseApiController    = require(global.appData.rootPath + '/api/expense');
    
    //define middleware to routes
    // router.get(middlewareRoutes.authMiddleware.checkAuthentication.get      , authMiddleware.checkApiAuthentication );
    // router.post(middlewareRoutes.recaptchaMiddleware.checkRecaptcha.post    , recaptchaMiddleware.checkApiRecaptcha );
    
    //define api routes
    router.post('/auth/signup', authApiController.signup);
    router.post('/auth/authenticate', authApiController.authenticate);
    
    router.use('/expense',authMiddleware.verifyToken);
    router.get('/expense/', expenseApiController.index);
    router.post('/expense/', expenseApiController.store);
    router.get('/expense/:expenseId', expenseApiController.show);
    router.put('/expense/:expenseId/', expenseApiController.update);
    router.delete('/expense/:expenseId', expenseApiController.destroy );
    
    //404 route - should always be the last route
    router.get('/*'     , commonApiController.invaliApiEndpoint );
    router.post('/*'    , commonApiController.invaliApiEndpoint );
    
    //apply routes
    app.use('/api', router);
};