import { iController }	from "../Sys/interfaces";
import { UserRepository } from "../Repository/user";
import User from "../Entity/user";
// only for debugging
// import Debug from '../Sys/Debug';

/* User Controller Class */
export default class UserController implements iController{

	get repository(){
		return new UserRepository;
	}

	async createAction(params:any):Promise<any>{
		return await this
		.repository
		.Create(params);
	}

	async listAction(params):Promise<any>{
		return await this
		.repository
		.GetAll(params);
	}

	async showAction(params:any):Promise<any>{
		let data = await this
		.repository
		.GetOne(params);

		return new User(data);
	}

	async editAction(params:any):Promise<any>{
		return await this
		.repository
		.Update(params);
	}
	async deleteAction(params:any):Promise<any>{
		return await this
		.repository
		.Delete(params);
	}
}
