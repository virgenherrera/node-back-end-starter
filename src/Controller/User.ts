import { IcrudController } from '../Sys/interfaces';
import userRepository from '../Repository/user';
import user from '../Poco/user';
// only for debugging
// import {dd} from '../Sys/Debug';

/* user Controller Class */
export default class UserController implements IcrudController {

	get repository() {
		return new userRepository;
	}

	async createAction(params): Promise<any> {
		const Entity	= new user(params);
		const data	= await this.repository.Create(Entity);

		const Res = new user( data );
		delete Res.password;
		return Res;
	}

	async listAction(params): Promise<any> {
		const {limit, offset} = params;
		const data = await this.repository.GetAll(params);

		data.rows = data.rows.map( row => new user(row) );
		const {count, rows} = data;

		return {count, rows, limit, offset};
	}

	async showAction(params): Promise<any> {
		let data	= await this.repository.GetById(params);
		data		= (data) ? new user(data) : null;

		return data;
	}

	async editAction(params): Promise<any> {
		const data = await this.repository.Update(params);

		return new user(data);
	}

	async deleteAction({id}): Promise<any> {
		return await this.repository.Delete(id);
	}
}
