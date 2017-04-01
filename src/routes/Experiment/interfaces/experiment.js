// Labels are omitted as they will be re-added
// by the experimenter after the recording session.


export type ExperimentObject = {
	cuid: string,
	name: string,
	experimenter: string,
	description:string,
	created_at: Date,
	videos: Array<string>,
};

export type ExperimentStateObject = {
	recording:boolean,
	saving: boolean,
	fetched:boolean,
	fetching: boolean,
	current: ?string,
	experiments:Array<ExperimentObject>,
	record:?<RecordObject>,
};

export type RecordObject = {
	orderId:number,
	subject: string,
	experiment: string,
	experimenter: string,
	description:string,
	breakpoints: Array<number>,
	labels:?Array<string>,
	duration: number,
	created_at: Date,
	phase:number
};

/*

export type RecordStateObject = {
	recording:boolean,
	saving: boolean,
	videoExist: boolean,
	video: ?string,
	current: ?number,
	record:<RecordObject>
};

*/