
export type AuthObject = {
	email: string,
	password: string,
};

export type AuthSessionObject = {
	email: string, 
	authed: boolean, 
	ip: ?string
}