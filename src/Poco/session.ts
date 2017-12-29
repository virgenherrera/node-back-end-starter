// only for debugging
// import { dd } from '../Sys/Debug';

export class Session {
	userId: string;
	role: string;
	historyId: number;

	constructor(params= null) {
		this.userId = params.userId;
		this.role = params.role;
		this.historyId = params.historyId;
	}
}
