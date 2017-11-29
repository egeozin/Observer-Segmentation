const express = require('express');
const ExperimentHelper = require('../helpers/experiment.helper');
const SubjectHelper = require('../helpers/subject.helper');
const PhaseHelper = require('../helpers/phase.helper');

const router = express.Router();

router.route('/experiments').get(ExperimentHelper.getExperiments);

router.route('/experiments').post(ExperimentHelper.addExperiment);

router.route('/signup').post(SubjectHelper.addSubject);

router.route('/subjects').get(SubjectHelper.getSubjects);

router.route('/phases').get(PhaseHelper.getPhases);

router.route('/nextPhases').get(PhaseHelper.getNextPhases);

router.route('/segment').post(PhaseHelper.addSegmentation);

module.exports = router;