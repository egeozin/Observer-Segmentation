var mongoose =require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

var ExperimentSchema = mongoose.Schema({
	name:{type:String, required:true},
	experimenter: {type:ObjectId, ref:"User", required:true},
	segmentations: [{type:ObjectId, ref:"Segmentation", required:false}],
	description:{type:String, required:true},
	created_at: {type:Date, default: Date.now},
	//videos: {type:String, required:false}
	videos:[String],
	cuid: { type: 'String', required: true },
})

var ExperimentModel = mongoose.model("Experiment", ExperimentSchema);

module.exports = ExperimentModel;