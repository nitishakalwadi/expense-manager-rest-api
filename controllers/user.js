module.exports = {
    
    profile: function(req, res, next){
        var viewData = {
            user : req.user
        };
        res.render('profile', viewData);
    },
    
    dashboard: function(req, res, next){
        var viewData = {
            user : req.user
        };
        res.render('dashboard', viewData);
    }
};