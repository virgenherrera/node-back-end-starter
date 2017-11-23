import { iController }	from "../Sys/interfaces";
import UserRepository	from "../Repository/user";
import User		from "../Poco/user";
// only for debugging
// import {dump} from '../Sys/Debug';

/* User Controller Class */
export default class UserController implements iController{

	get repository(){
		return new UserRepository;
	}

	async createAction(params:any):Promise<any>{
		let Entity	= new User(params);
		let data	= await this.repository.Create(Entity);

		return new User( data );
	}

	async listAction(params):Promise<any>{
		let {count,rows} = await this.repository.GetAll(params);
		let {limit,offset} = params;

		rows = rows.map( element => new User(element) );

		return {count,rows,limit,offset};
	}

	async showAction(params:any):Promise<any>{
		let data	= await this.repository.GetById(params);
		data		= (data) ? new User(data) : null;

		return data;
	}

	async editAction(params:any):Promise<any>{
		let data = await this.repository.Update(params);

		return new User(data);
	}

	async deleteAction(params:any):Promise<any>{
		return await this.repository.Delete(params);
	}
}
