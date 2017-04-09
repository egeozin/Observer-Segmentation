const Subject = require('../models/subject')
const cuid = require('cuid')
const sanitizeHtml = require('sanitize-html')
const getIP = require('./checkip')


/*
 * This should be integrated with Experiments query.
 *
 */

const getSubjects = function(req, res) {
	Subject.find().sort('-created_at').exec((err, subjects) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ subjects });
	})
}


const addSubject = function(req, res) {

	if (!req.body.signupInfo.email || !req.body.signupInfo.password) {
		res.status(403).end();
		console.log('You have to provide a name and description for your experiment');
	}

	const newSubject = new Subject(req.body.signupInfo);

	newSubject.email = sanitizeHtml(newSubject.email);
	newSubject.password = sanitizeHtml(newExperiment.password);
	newSubject.cuid = cuid();
	newSubject.ip = getIP(req);

	newSubject.save((err, sub) => {
		if(err) {
			res.status(500).send(err);
		}
		res.json({signupInfo: sub})
	})


}


module.exports = {
	getSubjects,
	addSubject
}