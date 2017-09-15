const Phase = require('../models/phase')
const Experiment = require('../models/experiment')
const Segmentation = require('../models/segmentation')
const cuid = require('cuid')
const sanitizeHtml = require('sanitize-html')


const formatPhases = (p) => {
	return {
		cuid:p.cuid,
		title:p.title,
		instructions:p.instructions,
		video:p.video,
		vid_length: p.vid_length,
		order:p.order,
		type:p.type
	}
}


const getPhases = function(req, res) {
	Experiment.findOne({name:'retrospective_protocol_00'}).populate('phases').select('phases name').exec((err, experiment) => {
		if (err) {
			res.status(500).send(err);
		}
		console.log('Success in bringing phases!')
		const phases = experiment.phases
		res.json({
			phases:{
				'name':experiment.name,
				'retro':experiment.retrospective,
				'id': experiment.cuid,
				'phases':phases.map(formatPhases)
			}
		})

	});
}

const addSegmentation = function(req, res) {

	if (!req.body.phaseData.segmentations) {
		console.log("You should provide appropriate segments");
		res.status(403).end();
	}

	const newPhaseData = req.body.phaseData;

	const newSegmentation = new Segmentation();

	newSegmentation.breakpoints = sanitizeHtml(newPhaseData.segmentations.breakpoints);
	newSegmentation.segment_labels = sanitizeHtml(newPhaseData.segmentations.segment_labels);
	newSegmentation.break_labels = sanitizeHtml(newPhaseData.segmentations.break_labels);
	newSegmentation.duration = sanitizeHtml(newPhaseData.duration);
	newSegmentation.type = sanitizeHtml(newPhaseData.type);
	newSegmentation.experiment = sanitizeHtml(newPhaseData.experiment);
	newSegmentation.experiment_id = sanitizeHtml(newPhaseData.experiment_id);
	newSegmentation.experimenter = 'Admin'
	newSegmentation.subject = sanitizeHtml(newPhaseData.subject);
	newSegmentation.cuid = cuid();

	newSegmentation.save((err, seg) => {
		if(err) {
			console.log(err);
			res.status(500).send(err);
		}

		Experiment.findOne({cuid:seg.experiment_id}, {$push:{segmentations: newSegmentation._id }}, (error, experiment) => {
			if (!error) {
				console.log('experiment sucessfully updated!')
				//Update for the Second Experiment
				res.json({ segmentInfo: {
						breakpoints: seg.breakpoints,
						break_labels: seg.break_labels,
						segment_labels: seg.segment_labels
					}
				});
			} else {
				console.log('error pushing segmentation into the experiment!')
			} 

		})

	});

}



module.exports = {
	getPhases,
	addSegmentation
}