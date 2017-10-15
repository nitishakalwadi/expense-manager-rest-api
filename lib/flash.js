var config = require(global.appData.rootPath + '/config/config');

module.exports = {
    success: function(req, msg){
        req.flash('flash', true);
        req.flash('msg', msg);
        req.flash('class', config.classes.success);
    },
    
    failure: function(req, msg){
        req.flash('flash', true);
        req.flash('msg', msg);
        req.flash('class', config.classes.failure);
    }
    
}