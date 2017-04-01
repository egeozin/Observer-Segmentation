var mongoose =require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = mongoose.Schema({
	user: {type: String, unique:true},
	password: {type:String, unique:true},
    completed_exp: {type:Boolean, default:false}
})


UserSchema.path('user').validate(function(value, done) {
	var that = this;
    that.model('User').count({ user: value }, function(err, count) {
        if (err) {
            return done(err);
        } 
        // If count is greater than zero, "invalidate"
        done(!count);
    });
}, 'Username already exists');


UserSchema.path("user").validate(function(value) {
	return /^[a-zA-Z0-9._-]/.test(value)},"Wrong characters!");


UserSchema.pre("save",function(next, done) {
    var that = this;
    mongoose.models["User"].findOne({user:that.user},function(err, results) {
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