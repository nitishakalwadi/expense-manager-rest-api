module.exports = {
    
    pageNotFound: function(req, res, next){
        var viewData = {};
        res.status(404).render('404', viewData);
    }
};