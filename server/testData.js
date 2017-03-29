const Segmentation = require('./models/segmentation');


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

			}
		});
	});
}

module.exports = loadTestData