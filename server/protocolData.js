
/* Instructions for the original experiments
 * For making researchers to create their own experiments
 * necessary interfaces should be provided to associate instructions
 * with experimental phases.
 */

const retro_general_description = `In this experiment. You will observe several videos and provide input according to the instructions.\
						   In the prepatory phase in order to make you familiar with the task a short practive video will be presented.\
						   Whenever you feel you are comfortable with the task you may proceed to the main phases of the experiment. \
						   If you are ready you can proceeed to the prepatory phase`

const retro_prep = `Before you begin you will get familiar with the experimental protocol in this prepatory phase.\
					When you press the "Next" button below, you will proceed to the prepatory phase.\
					In this phase, whenever you press the "Start" button the practice video will start playing.\
					Below the video frame there will be a timeline. On this timeline you will see the indicator of current time as a long vertical bar.\
					This bar is showing the corresponding time in the video during the playing of the video.\
					Your task is to press any key whenever you think that there is an event boundary in the video.\
					You will not be able to stop the video in this phase but you can repeat this task as many times as you want.`

const baseline_instructions = `Before you start the experiment we would like to understand how much time it takes for you to respond\
							  to a stimuli in sequence. In the following section, you will watch a simple video and press "spacebar" whenever you see a change in video\
							  (whenever you see a change in stimuli). When you press the "Next" button below, you will proceed to the baseline phase.`

const retro_phase_1 = `You are ready for the first part of the experiment!\
					   In the next section a drawing performance video will start playing whenever you press the "Start" key.\
					   In this phase you will indicate event boundaries by pressing the spacebar ("Space" key) and you will not be able to stop the video after you start the experiment.`

const retro_phase_2 = `In this last phase, you will be presented with the same video from the previous phase.\
					   But now, you will provide labels for your segments and breakpoints determined in the first phase. \
					   Also, you will be able to start, pause and resume the video however you want.`


module.exports = {
	retro_general_description,
	retro_prep,
	baseline_instructions,
	retro_phase_1,
	retro_phase_2
	//retro_baseline,
	//simult_description,
	//simult_instructions,
	//simult_phase_1,
	//simult_baseline,
}