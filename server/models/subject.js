var mongoose =require("mongoose");
mongoose.Promise = global.Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;


var validateEmail = function(value){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
};

const SubjectSchema = mongoose.Schema({
	email: {
        type: String, 
        trim:true, 
        lowercase:true, 
        unique:true, 
        required: 'E-mail address is required',
        validate: [validateEmail, 'Please fill a valid e-mail address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid e-mail address']
    },
	password: {type:String, unique:true},
    ip: {type:String, unique:true},
    completed_exp: {type:Boolean, default:false},
    cuid: { type: 'String', required: true },
})

/*
SubjectSchema.path('email').validate(function(value, done) {
	var that = this;
    that.model('Subject').count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        } 
        // If count is greater than zero, "invalidate"
        done(!count);
    });
}, 'Email already exists');
*/



/*
SubjectSchema.path("email").validate(function(value) {
	return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)}, "Wrong e-mail characters!");
*/


SubjectSchema.pre("save",function(next, done) {
    var that = this;
    mongoose.models["Subject"].findOne({email:that.email},function(err, results) {
        if(err) {
            next(err);
        } else if(results) {
        	console.log('results', results);
            that.invalidate("email","email must be unique");
            next(new Error("email must be unique"));
        } else {
            next();
        }
    });
});



var SubjectModel = mongoose.model("Subject", SubjectSchema);

module.exports = SubjectModel;