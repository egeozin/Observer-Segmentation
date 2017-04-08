const express = require('express');
const ExperimentHelper = require('../helpers/experiment.helper');
const SubjectHelper = require('../helpers/subject.helper');

const router = express.Router();

router.route('/experiments').get(ExperimentHelper.getExperiments);

router.route('/experiments').post(ExperimentHelper.addExperiment);

router.route('/subjects').get(SubjectHelper.getSubjects);

router.route('/subjects').post(SubjectHelper.addSubject);

module.exports = router;