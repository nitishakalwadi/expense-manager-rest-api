var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var modelName = 'User';
var collectionName = 'users';
var projection = {
    "_id": 1,
    "username": 1
};

var userSchema = mongoose.Schema({
    
        username: String,
        password: {
            type: String,
            select: false
        }
    
},
{
    collection: collectionName,
    versionKey: false
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(userPassword, dbPassword) {
    return bcrypt.compareSync(userPassword, dbPassword);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);