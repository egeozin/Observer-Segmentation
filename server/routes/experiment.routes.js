const express = require('express');
const ExperimentHelper = require('../helpers/experiment.helper');

const router = express.Router();

router.route('/experiments').get(ExperimentHelper.getExperiments);

router.route('/experiments').post(ExperimentHelper.addExperiment);

module.exports = router;