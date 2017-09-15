var mongoose =require("mongoose");
mongoose.Promise = global.Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;

/*

I want to be able to check the
segmentations of a specific subject across the baseline and protocols.
I can use python to inspect the data but an admin analysis might provide
a visual dashboard.

Also, I want to be able to compare different subjects within the same protocol.

So how to structure the data so that queries are more efficient.
Being redundant might help. So keeping as a separate Segmentation
with experiment, subject, breakpoints and labels might help


*/

var SegmentationSchema = mongoose.Schema({
	experimenter: {type:String, required:true},
	experiment_id: {type:String, required:false},
	experiment:{ type:String, required:true},
	type: {type:String, required:false},
	orderId: {type:Number, reqired:false},
	subject:{type:String, required:true},
	description:{type:String, required:false},
	breakpoints: [Number],
	duration: {type:Number, required:false},
	segment_labels: {type:[String], required:false},
	break_labels:{type:[String], required:false},
	cuid:{type:String, required:true},
	created_at: {type:Date, default: Date.now}
})


var SegmentationModel = mongoose.model("Segmentation", SegmentationSchema);

module.exports = SegmentationModel;