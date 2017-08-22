import {iRestfulResponse} from './interfaces'

// Failed Auth
export class error401 implements iRestfulResponse{
	public status	=  401;
	public success	= false;
	public message	= "Authentication failed";

	constructor(message=null){
		if( (message) ) this.message = message;
	}
}

// not found
export class error404 implements iRestfulResponse{
	public status	= 404;
	public success	= false;
	public message	= 'The requested resource could not be found but may be available in the future.';

	constructor(message=null){
		if( (message) ) this.message = message;
	}
}

// bad-Headers
export class error406 implements iRestfulResponse{
	public status	= 406;
	public success	= false;
	public message	= "Requests header must contain: 'content-type': 'application/x-www-form-urlencoded'";

	constructor(message=null){
		if( (message) ) this.message = message;
	}
}

// Internal Server Error
export class error500 implements iRestfulResponse{
	public status	= 500;
	public success	= false;
	public message	= "Internal Server Error";

	constructor(message=null){
		if( (message) ) this.message = message;
	}
}
