import UserModel from '../Model/user';
import SessionHistoryModel from '../Model/session_history';
import { IFindOne, ICreate, IDelete } from '../Sys/interfaces';
import { validatePassword } from '../Lib/passwordUtil';
// only for debugging
import { dd } from '../Sys/Debug';

export default class SessionRepository implements IFindOne, ICreate, IDelete {
	async FindOne(params, scope: string = 'default'): Promise<any> {
		const Wh = {
			where: {
				id: params.historyId,
				logout: null,
				user_id: params.userId,
			},
			// include: [{
			// 	attributes: ['id', 'first_name', 'last_name', 'email', 'role'],
			// 	model: UserModel,
			// 	required: true,
			// }]
		};

		const data = await SessionHistoryModel.scope( scope ).findOne(Wh);
		if ( !data ) {
			throw new Error('your token has expired');
		}

		return data;
	}

	async Create({ email = null, password = null }): Promise<any> {
		const User = await UserModel.findOne({ where: { email } });

		if (!User) {
			throw new Error(`Non-existent email: ${email}`);
		}
		if (!validatePassword(password, User.password)) {
			throw new Error(`bad credentials`);
		}

		const History = await SessionHistoryModel.create({ user_id: User.id });

		return {
			userId: User.id,
			role: User.role,
			historyId: History.id,
		};
	}

	async Delete(params): Promise<any> {
		const Wh = {
			where: {
				id: params.historyId,
			}
		};

		const data = await SessionHistoryModel.update({logout: new Date}, Wh );

		return (data);
	}
}
