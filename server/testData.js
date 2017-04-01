const User = require('./models/user');
const Segmentation = require('./models/segmentation');
const Experiment = require('./models/experiment');


const loadTestData = function() {
	Segmentation.count().exec((err, count) => {
		
		if (count > 0) {
			return;
		}
		const breakpoints1 = [1.334, 1.678, 2.500, 4.330, 6.729, 6.912, 7.497, 9.203, 12.241];
		const breakpoints2 = [0.988, 2.332, 4.451, 5.724, 7.675, 10.210];

		const labels1 = [];
		const labels2 = [];

		const duration1 = 15;
		const duration2 = 13;

		const description1 = "Initial test to check if everything is ok.";
		const description2 = "Another test to check that listing works.";

		const segmentation1 = new Segmentation({experimenter:'Admin',experiment:'00_test_00', orderId:0, subject:'Subject_Admin', description:description1, breakpoints:breakpoints1, duration:duration1, labels:labels1});
		const segmentation2 = new Segmentation({experimenter:'Admin',experiment:'00_test_01', orderId:1, subject:'Subject_Admin', description:description2, breakpoints:breakpoints2, duration:duration2, labels:labels2});

		Segmentation.create([segmentation1, segmentation2], (error) => {
			if (!error) {
		
				Segmentation.count().exec((err, count) => {
					if (count !== 2) {
						return;
					}
			
					Segmentation.find().exec((err, segments) => {
						if (err) {
							console.log('error getting dummy segmentations for dummy experiment')
							return;
						}
				
						User.count().exec((err, count) => {
							if (count > 0){
								return;
							}
							const experimenter1 = 'Admin';
							const password1 = 'Test_012';
							const user1 = new User({user: experimenter1, password: password1})
							
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
											const name1 = 'test_1'
											const name2 = 'test_2'
									
											const video1_a = 'https://www.youtube.com/watch?v=x8SEDH6res0'
											const video1_b = 'https://www.youtube.com/watch?v=x8SEDH6res0'
											const video1_c = 'https://www.youtube.com/watch?v=x8SEDH6res0'
								
											const video2_a = 'https://www.youtube.com/watch?v=cLtKIsDekpM'
											const video2_b = 'https://www.youtube.com/watch?v=cLtKIsDekpM'
											const video2_c = 'https://www.youtube.com/watch?v=cLtKIsDekpM'
								
											const description1 = "Initial experiment test to check if everything is ok."
											const description2 = "Another experiment test to check that listing works."
									
											const segmentation1 = segments[0]
											const segmentation2 = segments[1]

											const experiment1 = new Experiment({experimenter: user[0]._id, cuid:'cikqgkv4q01ck7453ualdn3hd', name:name1, segmentations:[segmentation1._id, segmentation2._id] , description: description1,  videos:[video1_a, video1_b, video1_c]})
											const experiment2 = new Experiment({experimenter: user[0]._id, cuid:'cikqgkv4q01ck7453ualdn3hf', name:name2, segmentations:segmentation2._id , description: description2,  videos:[video2_a, video2_b, video2_c]})

											Experiment.create([experiment1, experiment2], (error) => {
												if (!error) {
													console.log('experiments successfully created!');
												} else {
													console.log("something happened when creating experiments!");
													throw error
												}
											
											});
										})
									}
								}) 
								} else {
									console.log('error creating users!');
								}		
							});
						});
					})
				})
			} else {
				console.log('error in loading dummy experiments on segmentations!')
			}
		});
	});
}

module.exports = loadTestData