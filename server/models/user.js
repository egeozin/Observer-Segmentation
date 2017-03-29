var mongoose =require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = mongoose.Schema({
	user: {type: String, unique:true},
	password: {type:String, unique:true},

})

UserSchema.path('name').validate(function(value, done) {
	var that = this;
    that.model('User').count({ name: value }, function(err, count) {
        if (err) {
            return done(err);
        } 
        // If count is greater than zero, "invalidate"
        done(!count);
    });
}, 'Username already exists');


UserSchema.path("name").validate(function(value) {
	return /^[a-zA-Z0-9._-]/.test(value)},"Wrong characters!");


UserSchema.pre("save",function(next, done) {
    var that = this;
    mongoose.models["User"].findOne({name:that.name},function(err, results) {
        if(err) {
            next(err);
        } else if(results) {
        	console.log('results', results);
            that.invalidate("username","username must be unique");
            next(new Error("username must be unique"));
        } else {
            next();
        }
    });
});



var UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;