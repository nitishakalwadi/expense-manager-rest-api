module.exports = function(app) {
    var express = require('express');
    var router  = express.Router();
    
    var middlewareRoutes = require(global.appData.rootPath + '/config/middlewareRoutes');
    
    //get middlewares
    var authMiddleware          = require(global.appData.rootPath + '/middleware/authMiddleware');
    var recaptchaMiddleware     = require(global.appData.rootPath + '/middleware/recaptchaMiddleware');
    
    //get controllers    
    var homeController      = require(global.appData.rootPath + '/controllers/home');
    var authController      = require(global.appData.rootPath + '/controllers/auth');
    var userController      = require(global.appData.rootPath + '/controllers/user');
    var commonController    = require(global.appData.rootPath + '/controllers/common');
    
    //define middleware to routes
    // router.get(middlewareRoutes.authMiddleware.checkAuthentication.get      , authMiddleware.checkAuthentication );
    // router.post(middlewareRoutes.recaptchaMiddleware.checkRecaptcha.post    , recaptchaMiddleware.checkRecaptcha );
    
    //define routes
    router.get('/'          , homeController.index );
    router.get('/login'     , authController.login );
    router.get('/signup'    , authController.signup );
    router.get('/profile'   , userController.profile );
    router.get('/dashboard' , userController.dashboard );
    
    // // process the signup form
    // router.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect : '/dashboard', // redirect to the secure profile section
    //     failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));
    
    // router.post('/login', passport.authenticate('local-login', {
    //     successRedirect : '/dashboard', // redirect to the secure profile section
    //     failureRedirect : '/login', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));
    
    
    
    //404 route - should always be the last route
    router.get('*'          , commonController.pageNotFound );
    router.post('*'         , commonController.pageNotFound );
    
    //apply routes
    app.use('/', router);
};