module.exports = {
    
    login: function(req, res, next){
        var viewData = {};
        res.render('login', viewData);
    },
    
    signup: function(req, res, next){
        var viewData = {};
        res.render('signup', viewData);
    },
    
};