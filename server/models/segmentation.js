var mongoose =require("mongoose");
mongoose.Promise = global.Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;

var SegmentationSchema = mongoose.Schema({
	//owner: {type:ObjectId, ref:"User", required:true},
	experimenter: {type:String, required:true},
	//experiment: {type:ObjectId, ref:"Experiment", required:true},
	experiment: {type:String, required:true},
	type: {type:String, required:false},
	orderId: {type:Number, reqired:false},
	subject:{type:String, required:true},
	description:{type:String, required:false},
	breakpoints: [Number],
	duration: {type:Number, required:true},
	labels: {type:[String], required:false},
	cuid:{type:String, required:true},
	created_at: {type:Date, default: Date.now}
})


var SegmentationModel = mongoose.model("Segmentation", SegmentationSchema);

module.exports = SegmentationModel;