module.exports = {
    
    index: function(req, res, next){
        var viewData = {};
        res.render('index', viewData);
    }
};