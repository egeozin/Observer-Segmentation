
export type AuthObject = {
	email: string,
	cuid: string,
	ip: string,
	completed_exp:boolean,
};

export type AuthSessionObject = {
	subject: ?<AuthObject>,
	authed: boolean,
	phase: number
}