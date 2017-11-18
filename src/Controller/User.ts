import { iController }	from "../Sys/interfaces";
import UserRepository	from "../Repository/user";
import pocoUser		from "../Poco/user";
// only for debugging
// import Debug from '../Sys/Debug';

/* User Controller Class */
export default class UserController implements iController{

	get repository(){
		return new UserRepository;
	}

	async createAction(params:any):Promise<any>{
		let Entity	= new pocoUser(params);
		let data	= await this.repository.Create(Entity);

		return new pocoUser( data );
	}

	async listAction(params):Promise<any>{
		let {count,rows} = await this.repository.GetAll(params);
		let {limit,offset} = params;

		rows = rows.map( element => new pocoUser(element) );

		return {count,rows,limit,offset};
	}

	async showAction(params:any):Promise<any>{
		let data = await this.repository.GetById(params);

		return new pocoUser(data);
	}

	async editAction(params:any):Promise<any>{
		let data = await this.repository.Update(params);

		return new pocoUser(data);
	}

	async deleteAction(params:any):Promise<any>{
		return await this.repository.Delete(params);
	}
}
