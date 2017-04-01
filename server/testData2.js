const Experiment = require('./models/experiment');
const Segmentation = require('./models/segmentation');


var loadTestData2 = function() {

	let segmentations = []

	Segmentation.count().exec((err, count) => {
		if (count !== 2) {
			return;
		}

		console.log(count);

		let segmentations = Segmentation.find().exec((err, segments) => {
			if (err) {
				console.log('error getting dummy segmentations for dummy experiment')
				return;
			} else {
				console.log(segments);
				return segments
			}
		});

	})

	console.log(segmentations);

	if (segmentations.length > 1 ) {
		Experiment.count().exec((err, count) => {
			if (count > 0) {
				return;
			}
			const experimenter1 = 'Admin'
			const experimenter2 = 'Admin'

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
	
			const segmentation1 = segmentations[0]
			const segmentation2 = segmentations[1]
	
			const experiment1 = new Experiment({experimenter:experimenter1,name:name1, segmentations:segnmentation1 , description: description1,  description:description1, videos:[video1_a, video1_b, video1_c]})
			const experiment2 = new Experiment({experimenter:experimenter2,name:name2, segmentations:segnmentation2 , description: description2,  description:description2, videos:[video2_a, video2_b, video2_c]})
	
			Experiment.create([segmentation1, segmentation2], (error) => {
				if (!error) {
	
				}
			});
		});
	} else {
		console.log('Feeding experiment dummies unsuccessful!')
	}
}

module.exports = loadTestData2