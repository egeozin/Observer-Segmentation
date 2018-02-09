# Observr

Observr is an easy-to-use and accurate segmentation tool. Capturing accurate and detailed data from human subjects is an important task, and capturing data regarding event understanding is becoming more important for the fields of artificial intelligence, cognitive neurosciences and design. For this reason, I designed a web-based software that allows researchers to design, analyze and share their segmentation experiments. Moreover, with this software, researchers can collect data from subjects regarding specific moments in events that the subjects identify as important as well as corresponding labels for those moments and durations. This can be done with a millisecond accuracy that is well suited to proper scientific analysis.
<br>
<p align="center"><img src="https://github.com/egeozin/observer-segmentation/blob/master/images/sample_session.gif"/></p>
<br>
A segmentation study starts with researchers selecting which events to focus on. Events under study can be any event featuring specific everyday tasks, improvised dance or design performances or footage of observations of human interaction. The software then lets researchers upload or link their videos into their protocols. A protocol might feature multiple phases. For example, in order to make subjects familiar with the task researchers can introduce a preparatory segmentation phase. This phase can be followed by additional phases for recording baseline measurements or distracting subjects for the purposes of the experiment. Then, the main phases of measurement and collection can be appended to the protocol. Finally, multiple protocols can be appended together to create more complex experiments or to test new protocols.

<p align="center"><img src="https://github.com/egeozin/observer-segmentation/blob/master/images/software_setup.png"/></p>

The design of the segmentation interface comprises a software screen that contains the design video and an interactive timeline below it. This timeline provides the area where observers indicate event boundaries and segments. An indicator of the current time is shown with a protruded, sliding bar. Subjects press a key to indicate breakpoints. Within the context of this methodology, it is decided to define breakpoints as marks to indicate a specific moment, whereas segments are defined by the interval between consecutive breakpoints.

Depending on the protocol, when subjects press a key, they may be instructed to either continue indicating breakpoints without labeling or they may be asked to include their descriptions for the corresponding breakpoint and segment. For the latter, the software produces pop-up forms triggered by the key-press, in which subjects can provide their labels. The video and timer can be stopped in this moment, and whenever subjects are done with labeling they can continue to the video by pressing a key.

For example, with this software, researchers can develop protocols allowing for retrospective labeling. Retrospective labeling protocol work as follows: Initially, subjects are made familiar with the task and their baseline measurements are recorded. Then, in the first phase of the experiment subjects are presented with the video to be segmented. In this phase they are instructed to provide breakpoints only and they are not able to stop the video. In the second phase, subjects are presented with the same video and are instructed to provide labels for the segments and breakpoints they gave in the first phase. They can freely start and stop the video in this second phase. As subjects will have more time and control in this phase, the labels are subject to more careful interpretation. However, this protocol has its disadvantages. Primarily, a retrospective look on the given breakpoints and segments can contaminate the labels that they originally gave in the first phase.

<p align="center"><img src="https://github.com/egeozin/observer-segmentation/blob/master/images/form.png" width="500"/></p>

Additionally, the software enables researchers to produce protocols that let subjects change the locations of breakpoints, change the labels from previous phases, or even introduce new breakpoints or delete existing ones. Responses to this protocol can give clues about how the segmentation strategies of a subject change through multiple iterations. Furthermore, this protocol could help researchers understand what constitutes better information for a particular observer and study how subjects construct hierarchical relationships between coarse and fine segments.

<p align="center"><img src="https://github.com/egeozin/observer-segmentation/blob/master/images/recursive.png" width="500"/></p>

Sample protocols that can be produced with the software:

<p align="center"><img src="https://github.com/egeozin/observer-segmentation/blob/master/images/protocol_retro.png" width="600"/></p>
<br>
<p align="center"><img src="https://github.com/egeozin/observer-segmentation/blob/master/images/protocol_simult.png" width="600"/></p>

    This project is designed with: 

    Node.js as Javascript runtime environment + 
    Express as backend server  + 
    Webpack as module bundler + 
    MongoDB for database +
    Redux for frontend state management +
    React as view library.


