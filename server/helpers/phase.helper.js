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
				'phases':phases.map(formatPhases)
			}
		})

	});
}

const postPhase = function(req, res) {

	if (!req.body.segmentations) {
		console.log("You should provide appropriate segments");
		res.status(403).end();
		
	}

	const newSegmentation = new Segmentation();

	newSegmentation.breakpoints = sanitizeHtml(newSubject.email);
	newSubject.password = sanitizeHtml(newSubject.password);
	newSubject.cuid = cuid();
	newSubject.ip = getIP(req);

	newSubject.save((err, sub) => {
		if(err) {
			console.log(err);
			// Should send a response with error message, like "You should enter a valid username"
			res.status(500).send(err);
		}
		res.json({ signupInfo:{ 
			name:sub.email,
			cuid:sub.cuid,
			ip:sub.ip,
			completed_exp: sub.completed_exp
		} });

	});

}



module.exports = {
	getPhases
}