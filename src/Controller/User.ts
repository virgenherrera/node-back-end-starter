import { iController }	from "../Sys/interfaces";
import { UserRepository } from '../Model/user'
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

	async listAction({limit,offset}:any):Promise<any>{
		return await this
		.repository
		.GetAll({limit,offset});
	}

	async showAction(params:any):Promise<any>{
		return await this
		.repository
		.GetOne(params);
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
