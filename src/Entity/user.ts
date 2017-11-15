import { iUser } from '../Model/user';
// only for debugging
// import Debug from '../Sys/Debug';

export default class User implements iUser{
	firstName		: string;
	lastName		: string;
	email			: string;
	password		: string;
	rememberToken	: string;

	constructor(params:iUser=null){
		if(params){
			if( params.firstName )		this.firstName = params.firstName;
			if( params.lastName )		this.lastName = params.lastName;
			if( params.email )			this.email = params.email;
			if( params.password )		this.password = params.password;
			if( params.rememberToken )	this.rememberToken = params.rememberToken;
		}
	}
}
