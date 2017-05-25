
export type AuthObject = {
	name: string,
	cuid: string,
	ip: string,
	completed_exp:boolean,
};

export type AuthSessionObject = {
	subject: ?<AuthObject>,
	authed: boolean,
	phase: number
};