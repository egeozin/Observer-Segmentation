export type SegmentObject = {
	id: number,
	observer: string,
	experiment: string,
	breakpoints: Array<number>,
	labels: Array<string>
};

export type SegmentStateObject = {
	current: ?number,
	fetching: boolean,
	saved: Array<number>,
	segmentations: Array<SegmentObject>
};
