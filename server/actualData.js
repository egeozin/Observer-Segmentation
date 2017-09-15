const User = require('./models/user');
const Segmentation = require('./models/segmentation');
const Experiment = require('./models/experiment');
const Phase = require('./models/phase');
const cuid = require("cuid");
const phases = require('./protocolData');


const loadActualData = function() {
	Segmentation.count().exec((err, count) => {
		
		if (count > 0) {
			return;
		}
		const breakpoints1 = [];
		const breakpoints2 = [];

		const duration1 = 15;
		const duration2 = 13;

		const description1 = "Initial test to check if everything is ok.";
		const description2 = "Another test to check that listing works.";

		const s_cuid_1 = cuid(); 
		const s_cuid_2 = cuid();

		const segmentation1 = new Segmentation({experimenter:'Admin',experiment:'retrospective_protocol_00', orderId:0, subject:'Subject_Admin', cuid:s_cuid_1 , description:description1, breakpoints:breakpoints1, duration:duration1});
		const segmentation2 = new Segmentation({experimenter:'Admin',experiment:'simultaneous_protocol_00', orderId:1, subject:'Subject_Admin', cuid:s_cuid_2 , description:description2, breakpoints:breakpoints2, duration:duration2});

		Segmentation.create([segmentation1, segmentation2], (error) => {
			if (!error) {
		
				Segmentation.count().exec((err, count) => {
					if (count !== 2) {
						return;
					}
			
					Segmentation.find().exec((err, segments) => {
						if (err) {
							console.log('error getting test segmentations for actuak experiments')
							return;
						}
				
						User.count().exec((err, count) => {
							if (count > 0){
								return;
							}
							const experimenter1 = 'Admin';
							const password1 = 'Test_012';
							const u_cuid_1 = cuid();
							const user1 = new User({user: experimenter1, password: password1, cuid: u_cuid_1})
							
							User.create(user1,  (error) => {
								if (!error) {
									User.find().exec((err, user) => {
										if (err) {
											console.log('error getting users!');
										} else {

										Experiment.count().exec((err, count) => {
											if (count > 0) {
												return;
											}
											const name1 = 'retrospective_protocol_00'
											const name2 = 'simultaneous_protocol_00'

											const retro1 = true
											const retro2 = false
									
											const video1_group_1 = 'x8SEDH6res0'
											const video1_group_2 = 'x8SEDH6res0'
											const video1_baseline = 'x8SEDH6res0'
											const video1_trial = 'x8SEDH6res0'
								
											const video2_group_1 = 'cLtKIsDekpM'
											const video2_group_2 = 'cLtKIsDekpM'
											const video2_baseline = 'cLtKIsDekpM'
											const video2_trial = 'cLtKIsDekpM'
								
											const description1 = "Initial experiment test to check if everything is ok."
											const description2 = "Another experiment test to check that listing works."

											const segmentation1 = segments[0]
											const segmentation2 = segments[1]

											const e_cuid_1 = cuid()
											const e_cuid_2 = cuid()

											const experiment1 = new Experiment({experimenter: user[0]._id, cuid:e_cuid_1, name:name1, segmentations:[segmentation1._id, segmentation2._id] , description: description1, retrospective:retro1,  videos:[video1_group_1, video1_group_2, video1_baseline, video1_trial]})
											const experiment2 = new Experiment({experimenter: user[0]._id, cuid:e_cuid_2, name:name2, segmentations:[segmentation2._id] , description: description2, retrospective:retro2,  videos:[video2_group_1, video2_group_2, video2_baseline, video2_trial]})

											Experiment.create([experiment1, experiment2], (error) => {
												if (!error) {
													console.log('experiments successfully created!');

													Experiment.find().exec((err, experiments) => {
														if (err) {
															console.log('error getting actual experiments')
															return;
														} else {
															// This is where the phases are loaded

															Phase.count().exec((err, count) => {
																if (count > 0 ){
																	return;
																}
																const titles = ['General Instructions', 'Prepatory Phase', 'Baseline Recording', 'Phase 1', 'Phase 2']

																const instructions = [phases.retro_general_description, phases.retro_prep, phases.baseline_instructions, phases.retro_phase_1, phases.retro_phase_2]

																const first = experiments.filter(function( el ) {
  																	return el.name === 'retrospective_protocol_00';
																});

																const second = experiments.filter(function( el ) {
  																	return el.name === 'simultaneous_protocol_00';
																});

																const experiment1 = first[0]._id
																const experiment2 = second[0]._id

																console.log(experiment1);

																const videos = ['L0kBNTtEQ1U', 'L0kBNTtEQ1U', 'L0kBNTtEQ1U', 'L0kBNTtEQ1U', 'L0kBNTtEQ1U']
																const vid_lengths = [55, 55, 55, 55 , 55]
																const types = ['init','prep','baseline','phase_1','phase_2']
																const orders = [0, 1, 2, 3, 4]
																
																const cuid1 = cuid()
																const cuid2 = cuid()
																const cuid3 = cuid()
																const cuid4 = cuid()
																const cuid5 = cuid()

																const phase1 = new Phase({title:titles[0], instructions:instructions[0], experiment:experiment1, video:videos[0], vid_length: vid_lengths[0], type:types[0], cuid:cuid1, order:orders[0]})
																const phase2 = new Phase({title:titles[1], instructions:instructions[1], experiment:experiment1, video:videos[1], vid_length: vid_lengths[1], type:types[1], cuid:cuid2, order:orders[1]})
																const phase3 = new Phase({title:titles[2], instructions:instructions[2], experiment:experiment1, video:videos[2], vid_length: vid_lengths[2], type:types[2], cuid:cuid3, order:orders[2]})
																const phase4 = new Phase({title:titles[3], instructions:instructions[3], experiment:experiment1, video:videos[3], vid_length: vid_lengths[3], type:types[3], cuid:cuid4, order:orders[3]})
																const phase5 = new Phase({title:titles[4], instructions:instructions[4], experiment:experiment1, video:videos[4], vid_length: vid_lengths[4], type:types[4], cuid:cuid5, order:orders[4]})

																Phase.create([phase1, phase2, phase3, phase4, phase5], (error, phases) => {
																	if (!error) {
																		console.log('phases successfully created!');
																		

																		Experiment.findByIdAndUpdate(experiment1, {$push:{phases: {$each: phases}}}, (error, experiment) => {
																			if (!error) {
																				console.log('experiment sucessfully updated!')
																				//Update for the Second Experiment

																			} else {
																				console.log("something bad happened while updating experiments!")
																			}

																		})

																	} else {
																		console.log("something bad happened while creating phases!")
																	}

																})
															})
														}

													})

												} else {
													console.log("something bad happened while creating experiments!");
													throw error
												}
											
											});
										})
									}
								}) 
								} else {
									console.log('something bad happened while creating users!');
								}		
							});
						});
					})
				})
			} else {
				console.log('error in loading experiments on segmentations!')
			}
		});
	});
}

module.exports = loadActualData