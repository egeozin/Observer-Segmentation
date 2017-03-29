const Experiment = require('./models/experiment')
const cuid = require('cuid')
const sanitizeHtml = require('sanitize-html')


export function getExperiments(req, res) {
	Experiment.find().sort('-created_at').exec((err, experiments) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ experiments });
	})
}


export function addExperiment(req, res) {

	if (!req.body.experiment.name || !req.body.experiment.description) {
		res.status(403).end();
		console.log('You have to provide a name and description for your experiment');
	}

	const newExperiment = new Experiment(req.body.experiment);

	newExperiment.name = sanitizeHtml(newExperiment.name);
	newExperiment.description = sanitizeHtml(newExperiment.description);
	newExperiment.cuid = cuid();
	newExperiment.save((err, exp) => {
		if(err) {
			res.status(500).send(err);
		}
		res.json({experiment: exp})
	})


}

export function addSegmentation(req, res) {

}