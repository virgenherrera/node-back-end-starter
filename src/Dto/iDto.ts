export interface iDto{
	status	: number;
	success	: boolean;
	message	: string;
	data?	: Object|Object[];
	limit?	: number;
	offset?	: number;
	count?	: number;
};
