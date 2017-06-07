var mongoose =require("mongoose");
mongoose.Promise = global.Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;

var PhaseSchema = mongoose.Schema({
	title:{type:String, required:true},
	instructions:{type:String, required:true},
	experiment: {type:ObjectId, ref:"Experiment", required:false},
	video: {type:String, required:false},
	type: {type:String, required:true},
	cuid: {type: String, required: true},
	order:{type:Number, required:true}
})

var PhaseModel = mongoose.model("Phase", PhaseSchema);

module.exports = PhaseModel;