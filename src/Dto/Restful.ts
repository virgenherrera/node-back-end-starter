import {iRestfulResponse} from './interfaces';

export class authDto implements iRestfulResponse{
	public status: 200;
	public success: true;
	public message: 'Authentication successful';
	public data;

	constructor(params){
		if( (params) )this.data = params;
	}
}

export class getDto implements iRestfulResponse{
	public status: 200;
	public success: true;
	public message: 'Resource found';
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
			delete this.limit;
			delete this.offset;
			delete this.count;
		}
	}
}

export class postDto implements iRestfulResponse{
	public status: 201;
	public success: true;
	public message: 'Resource created';
	public data;

	constructor(params){
		if( (params) )this.data = params;
	}
}

export class putDto implements iRestfulResponse{
	public status: 200;
	public success: true;
	public message: 'Resource updated';
	public data;

	constructor(params){
		if( (params) )this.data = params;
	}
}

export class deleteDto implements iRestfulResponse{
	public status: 200;
	public success: true;
	public message: 'Resource deleted';
	public data;

	constructor(params){
		if( (params) )this.data = params;
	}
}
