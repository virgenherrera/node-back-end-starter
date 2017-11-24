import { request } from 'chai';
import { Types } from 'mongoose';
import { correct, incorrect } from './credentials';

/**
*
* Constants
*
*/
export const commonExpectedKeys = ['status','success','message','data'];
export const extendedExpectedKeys = commonExpectedKeys.concat(['count','limit','offset']);

/**
*
* Functions
*
*/
export function genRandPersistenceId():string{
	return Types.ObjectId().toString();
}

export async function requestToken(App){
	let res = await request(App)
	.post('/api/v1/login')
	.set('content-type', 'application/x-www-form-urlencoded')
	.send(correct);

	return res.body.data.token;
}
