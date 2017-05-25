const Phase = require('../models/phase')
const Experiment = require('../models/experiment')
const cuid = require('cuid')
const sanitizeHtml = require('sanitize-html')


const formatPhases = (p) => {
	return {
		cuid:p.cuid,
		title:p.title,
		instructions:p.instructions,
		video:p.video,
		order:p.order,
		type:p.type
	}
}


const getPhases = function(req, res) {
	Experiment.findOne({cuid:req.params.cuid}).populate('phases').select('phases name').exec((err, experiment) => {
		if (err) {
			res.status(500).send(err);
		}
		console.log('Success in bringing phases!')
		const phases = experiment.phases;
		res.json({
			phases:{
				'name':experiment.name,
				'phases':phases.map(formatPhases)
			}
		})

	});
}



module.exports = {
	getPhases
}