
/* Instructions for the original experiments
 * For making researchers to create their own experiments
 * necessary interfaces should be provided to associate instructions
 * with experimental phases.
 */

const general_description = `In this experiment, you will observe several videos and provide input according to the given instructions.\
						   In the preparatory phase, in order to make you familiar with the task a short practive video will be presented.\
						   Whenever you feel you are comfortable with the task you may proceed to the main phases of the experiment. \
						   If you are ready you can proceeed to the preparatory phase`

const general_description_2 = `In this experiment, you will observe several videos and provide input according to the given instructions.\
						   In the preparatory phase, in order to make you familiar with the task a short practive video will be presented.\
						   Whenever you feel you are comfortable with the task you may proceed to the main phases of the experiment. \
						   This experiment consist of two protocols while the second protocol is optional to take. You will be presented with \
						   the option to either finalize the experiment or continue to the second protocol at the end of the first protocol. \
						   If you are ready you can proceeed to the preparatory phase`


const between_description = `Thanks for attempting this second protocol. In this protocol, you will observe several videos and provide input according to the given instructions.\
						   In the preparatory phase, in order to make you familiar with the task a short practive video will be presented.\
						   Whenever you feel you are comfortable with the task you may proceed to the main phases of the experiment. \
						   If you are ready you can proceeed to the preparatory phase`

const retro_prep = `Before you begin the experiment you will get familiar with the experimental protocol in this preparatory phase.\
					When you press the "Next" button below, you will proceed to the preparatory phase.\
					In this phase, whenever you press the "Start" button the practice video will start playing.\
					Below the video frame there will be a timeline. On this timeline you will see the indicator of current time as a long vertical bar.\
					This bar is showing the corresponding time in the video during the playing of the video.\
					Your task is to press the Space Bar or 'S' key whenever you think that there is an event boundary in the video.\
					You will not be able to stop the video in this phase but you can repeat this preparatory task as many times as you want.`

const baseline_instructions = `Before you start the experiment we would like to understand how much time it takes for you to respond\
							  to a stimuli in sequence. Press the Space Bar or 'S' key to indicate the important moments in the video. What constitutes an important moment is up to you.\
							  When you press spacebar the video will not stop. When you press the "Got it!" button below, you will proceed to the baseline phase.`

const baseline_instructions_2 = `Before you start the experiment we would like to understand how much time it takes for you to respond\
							  to a stimuli in sequence. In the following section, you will watch a simple video and press "spacebar" whenever you see a change in video\
							  (whenever you see a change in stimuli). When you press spacebar the video will not stop. When you press the "Got it!" button below, you will proceed to the baseline phase.`

const retro_phase_1 = `You are ready for the first part of the experiment!\
					   In the next section a drawing performance video will start playing whenever you press the "Start" button.\
					   In this phase you will indicate event boundaries by pressing the spacebar ("Space" key) and you will not be able to stop the video after you start the experiment.`

const retro_phase_2 = `In this last phase, you will be presented with the same video from the previous phase.\
					   But now, you will provide labels for your segments and breakpoints determined in the first phase. \
					   Go through the segments you defined in the first phase and click on one to submit your label or descriptions for both\
					   the breakpoints and segments. For a particular breakpoint, please write in the breakpoint box what happened in the video that might have caused you \
					   to provide breakpoint at that moment. Similary for the segment box, please write what happened in the video between this breakpoint and previous breakpoint.\
					   You will be able to start, pause and resume the video however you want. Finally in order to finish this protocol you have to provide a description for each breakpoint and segment.`

const simult_prep = `Before you begin the experiment you will get familiar with this protocol in this preparatory phase.\
					When you press the "Next" button below, you will proceed to the preparatory phase.\
					In this phase, whenever you press the "Start" button the practice video will start playing.\
					Below the video frame there will be a timeline. On this timeline you will see the indicator of current time as a long vertical bar.\
					This bar is showing the corresponding time in the video during the playing of the video.\
					Your task is to press the Space Bar or 'S' key to indicate the important moments in the video. What constitutes an important moment is up to you. \
					When you press the key, a pop-up form will appear. You are asked to write your descriptions for both the breakpoints and segments. \
					You will not be able to stop the video in this phase but you can repeat this preparatory task as many times as you want.`

const simult_prep_2 = `Before you begin the experiment you will get familiar with this protocol in this preparatory phase.\
					When you press the "Next" button below, you will proceed to the preparatory phase.\
					In this phase, whenever you press the "Start" button the practice video will start playing.\
					Below the video frame there will be a timeline. On this timeline you will see the indicator of current time as a long vertical bar.\
					This bar is showing the corresponding time in the video during the playing of the video.\
					Your task is to press the Space Bar or 'S' key whenever you think that there is an event boundary in the video.\
					When you press the key, a pop-up form will appear. You are asked to write your descriptions for both the breakpoints and segments. \
					You will not be able to stop the video in this phase but you can repeat this preparatory task as many times as you want.`

const simult_phase_1 = `You are ready for the experiment!\
					   In the next section a drawing performance video will start playing when you press the "Start" button.\
					   Your task is to press the Space Bar or 'S' key to indicate the important moments in the video. What constitutes an important moment is up to you.\
					   When you press the key video will stop and a pop-up form will appear and the video will not continue until you provide your descriptions for both the breakpoints and segments. \
					   For a particular breakpoint, please write in the breakpoint box what happened in the video that might have caused you \
					   to provide breakpoint at that moment. \
					   Similary for the segment box, please write what happened in the video between this breakpoint and previous breakpoint.`


const generic_between = `If you want to take the second protocol that is similar to this one but slightly different, press "Continue". Otherwise press "Finish" to end the experiment. `

const generic_end = `Thanks for participating in this experiment.`


module.exports = {
	general_description,
	between_description,
	retro_prep,
	baseline_instructions,
	retro_phase_1,
	retro_phase_2,
	simult_prep,
	simult_phase_1,
	generic_between,
	generic_end
}