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

	if (!req.body.signupInfo.email) {
		console.log('You have to provide an email and password for your experiment');
		res.status(403).end();
		
	}

	const newSubject = new Subject(req.body.signupInfo);

	newSubject.email = sanitizeHtml(newSubject.email);
	newSubject.password = sanitizeHtml(newSubject.password);
	newSubject.cuid = cuid();
	//newSubject.ip = getIP(req);
	newSubject.isNew = false;

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

/*
signupInfo: {
			email:sub.email,
			cuid:sub.cuid,
			ip:sub.ip,
			completed_exp: sub.completed_exp
		}

*/


module.exports = {
	getSubjects,
	addSubject
}