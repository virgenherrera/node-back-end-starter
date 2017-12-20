import { BelongsTo, Column, DataType, ForeignKey, Model, Scopes, Table } from 'sequelize-typescript';
import UserModel from './user';
const defaultAttributes = ['id', 'login', 'logout', 'user_id', ];
// only for debugging
// import { dd } from "../Sys/Debug";

@Scopes({
	default: { attributes: defaultAttributes },
	full: { attributes: defaultAttributes },
	includeUser: {
		attributes: defaultAttributes,
		include: [() => UserModel]
	},
})
@Table({
	tableName: 'session_histories',
})
export default class SessionHistoryModel extends Model<SessionHistoryModel> {

	// integer Type
	@Column({
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		type: DataType.BIGINT,
	})
	id: number;

	@Column({
		allowNull: false,
		type: DataType.DATE,
		defaultValue: DataType.NOW
	})
	login: Date;

	@Column({
		allowNull: true,
		type: DataType.DATE,
		defaultValue: null
	})
	logout: Date;

	@ForeignKey(() => UserModel)
	@Column
	user_id: string;

	@BelongsTo(() => UserModel)
	user: UserModel;
}

