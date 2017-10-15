var mongoose = require('mongoose');

var config = require(global.appData.rootPath + '/config/config');

var Expense = require(global.appData.rootPath + '/models/expense');

module.exports = {

    index: function(req, res, next){
        Expense.getAllExpenses(req.user._id)
        .then(function(expenses){
            res.json({
                success: true,
                data: expenses
            });
        });
    },

    store: function(req, res, next){
        var validationRules = {
            'expenseName': {
                notEmpty: true,
                errorMessage: 'expense name is required'
            },
            'expense': {
                notEmpty: true,
                isInt: true,
                errorMessage: 'expense value is required'
            }
        };
        req.check(validationRules);
        req.getValidationResult().then(function(result) {
            try{
                result.throw();
                var newExpense = new Expense();
                newExpense.expenseName = req.body.expenseName;
                newExpense.expense = req.body.expense;
                newExpense.addedBy = req.user._id;
                newExpense.save()
                .then(function(expense){
                    res.json({
                        success: true,
                        data: expense
                    });
                });
            }
            catch(e){
                res.json({
                    success: false,
                    msg: e.array()
                });
            }
        });
    },

    show: function(req, res, next){
        var expenseId = req.params.expenseId;
        
        Expense.get(req.user._id, expenseId)
        .then(function(expense){
            if(expense.length > 0){
                res.json({
                    success: true,
                    data: expense
                });    
            }
            else{
                res.json({
                    success: false
                });
            }
            
        });
    },
    
    update: function(req, res,next){
        var expenseId = req.params.expenseId;
        var updateExpenseObj = {
            expenseName: req.body.expenseName,
            expense: req.body.expense
        };
        Expense.findByIdAndUpdate(expenseId, updateExpenseObj, {new: true}).exec().
        then(function(updatedExpense){
            if(updatedExpense){
                res.json({
                    success: true,
                    expense: updatedExpense
                });
            }
            else{
                res.json({
                    success: false
                });
            }
        });
    },

    destroy: function(req, res, next){
        var validationRules = {
            'expenseId': {
                in: 'params',
                notEmpty: true,
                isInt: true,
                errorMessage: 'expense ID is required'
            }
        };
        req.check(validationRules);
        // req.getValidationResult().then(function(result) {
        //     try{
        //         result.throw();
        //         var expenseId = req.params.expenseId;
        //         var userId = req.user._id;
        //         var expense = new Expense();
        //         expense.deleteExpense(expenseId, userId, function(result){
        //             res.send();
        //         });
        //     }
        //     catch(e){
        //         res.send(e.array());
        //     }
        // });
        
        var expenseId = req.params.expenseId;
        Expense.findByIdAndRemove(expenseId).exec()
        .then(function(expense){
            if(expense){
                res.json({
                    success: true,
                    data: expense
                });
            }
            else{
                res.json({
                    success: false
                });
            }
        });
    }
};