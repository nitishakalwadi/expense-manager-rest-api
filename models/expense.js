// var projections = require(global.appData.rootPath + '/projections/projections.json');

var mongoose = require('mongoose');
var modelName = 'Expense';
var collectionName = 'expenses';
var projection = {
    "_id": 1,
    "expenseName": 1,
    "expense": 1,
    "created_at": 1,
    "updated_at": 1,
    "addedBy": 1
};

var expenseSchema = mongoose.Schema({
    expenseName: String,
    expense: Number,
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: Date,
    updated_at: Date
},
{
    collection: collectionName,
    versionKey: false
});

// methods ======================

expenseSchema.statics.getAllExpenses = function(userId){
    var userObjectId = mongoose.Types.ObjectId(userId);
    return this.model(modelName).find({
        'addedBy': userObjectId
    }, projection)
    .populate('addedBy')
    .exec();
}

expenseSchema.statics.get = function(userId, expenseId){
    var userObjectId = mongoose.Types.ObjectId(userId);
    var expenseObjectId = mongoose.Types.ObjectId(expenseId);
    return this.model(modelName).find({
        '_id': expenseObjectId,
        'addedBy': userObjectId
    }, projection)
    .populate('addedBy')
    .exec();
}

expenseSchema.methods.saveExpense = function(expense, callback) {
    this.expenseName = expense.expenseName;
    this.expense = expense.expense;
    this.addedBy = expense.addedBy;
    this.save(callback);
}

expenseSchema.methods.deleteExpense = function(expenseId, userId, callback) {
    var expenseObjectId = mongoose.Types.ObjectId(expenseId);
    var userObjectId = mongoose.Types.ObjectId(userId);
    this.model(modelName).find({
        _id: expenseObjectId,
        addedBy: userObjectId
    })
    .remove()
    .exec(function(err, result){
        return callback(result);
    });
}

//pre methods
expenseSchema.pre('save', function(next){
    // get the current date
    var currentDate = new Date();
    
    // change the updated_at field to current date
    this.updated_at = currentDate;
    
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;
        
    next();
});

// create the model for users and expose it to our app
module.exports = mongoose.model(modelName, expenseSchema);