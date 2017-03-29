var mongoose =require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var SegmentationSchema = mongoose.Schema({
	//owner: {type:ObjectId, ref:"User", required:true},
	experimenter: {type:String, required:true},
	//experiment: {type:ObjectId, ref:"Experiment", required:true},
	experiment: {type:String, required:true},
	phase: {type:Number, required:false},
	orderId: Number,
	subject:{type:String, required:true},
	description:{type:String, required:false},
	breakpoints: [ Number],
	duration: Number,
	labels: {type:[String], required:false},
	created_at: {type:Date, default: Date.now}
})


var SegmentationModel = mongoose.model("Segmentation", SegmentationSchema);

module.exports = SegmentationModel;