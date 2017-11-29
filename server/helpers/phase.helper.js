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


const breakpointChecker = (bs) => {
	bs.filter((e, i, arr) => {
		// The value on the right side of the inequality(15ms) is the definition of a mistake in this context.
		return i !== 0 ? (Math.abs(arr[i-1] - e) < 15 ? false : e ) : e
	})
}


const produceSegments = (seg) => {
	const segments = seg.breakpoints.map((e, i) => {
		return {
			breakpoint: e,
			segment_label: seg.segment_labels[i],
			break_label: seg.break_labels[i],
		}
	})
	return segments
}


const getPhases = function(req, res) {
	Experiment.findOne({name:'simultaneous_protocol_00'}).populate('phases').select('phases name cuid retrospective').exec((err, experiment) => {
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

const getNextPhases = function(req, res) {
	Experiment.findOne({name:'retrospective_protocol_00'}).populate('phases').select('phases name cuid retrospective').exec((err, experiment) => {
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

	newSegmentation.breakpoints = newPhaseData.segmentations.map((e) => {return e.breakpoint});
	newSegmentation.segment_labels = newPhaseData.segmentations.map((e) => {return sanitizeHtml(e.segment_label)}) ;
	newSegmentation.break_labels = newPhaseData.segmentations.map((e) => {return sanitizeHtml(e.break_label)});
	newSegmentation.duration = newPhaseData.duration;
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

		Experiment.findOneAndUpdate({cuid:seg.experiment_id}, {$push:{segmentations: newSegmentation._id }}, (error, experiment) => {
			if (!error) {
				console.log('experiment sucessfully updated!')
				//Update for the Second Experiment

				//console.log(produceSegments(seg))

				res.json({ 
					segmentation: {
						segments:produceSegments(seg),
						type: seg.type
					}
				});
			} else {
				console.log(error);
				console.log('error pushing segmentation into the experiment!');
			} 

		})

	});

}



module.exports = {
	getPhases,
	getNextPhases,
	addSegmentation
}