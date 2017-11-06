import {iResDto} from './iResDto';

// Success Auth
export class authDto implements iResDto{
	public status	= 200;
	public success	= true;
	public message	= 'Authentication successful';
	public data;

	constructor(params){
		if( (params) )this.data = params;
	}
}

// Success GET
export class getDto implements iResDto{
	public status	= 200;
	public success	= true;
	public message	= 'Resource found';
	public data;
	public limit;
	public offset;
	public count;

	constructor(params){

		let {rows=false,count=-1} = params;
		if( (rows) && count >= 0 ){
			this.data	= rows;
			this.limit	= this.limit;
			this.offset	= this.offset;
			this.count	= count;

		} else {
			this.data = params;
		}
	}
}

// Success POST
export class postDto implements iResDto{
	public status	= 201;
	public success	= true;
	public message	= 'Resource created';
	public data;

	constructor(params){
		if( (params) )this.data = params;
	}
}

// Success PUT
export class putDto implements iResDto{
	public status	= 200;
	public success	= true;
	public message	= 'Resource updated';
	public data;

	constructor(params){
		if( (params) )this.data = params;
	}
}

// Success DELETE
export class deleteDto implements iResDto{
	public status	= 200;
	public success	= true;
	public message	= 'Resource deleted';
	public data;

	constructor(params){
		if( (params) )this.data = params;
	}
}

// Failed Auth
export class error401 implements iResDto{
	public status	=  401;
	public success	= false;
	public message	= "Authentication failed";

	constructor(message=null){
		if( (message) ) this.message = message;
	}
}

// not found
export class error404 implements iResDto{
	public status	= 404;
	public success	= false;
	public message	= 'The requested resource could not be found but may be available in the future.';

	constructor(message=null){
		if( (message) ) this.message = message;
	}
}

// bad-Headers
export class error406 implements iResDto{
	public status	= 406;
	public success	= false;
	public message	= "Requests header must contain: 'content-type': 'application/x-www-form-urlencoded'";

	constructor(message=null){
		if( (message) ) this.message = message;
	}
}

// Internal Server Error
export class error500 implements iResDto{
	public status	= 500;
	public success	= false;
	public message	= "Internal Server Error";

	constructor(message=null){
		if( (message) ) this.message = message;
	}
}
