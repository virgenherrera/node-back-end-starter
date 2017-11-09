import { Document, Schema, Model, model } from "mongoose";

export interface iUser{
	email			: String|Object;
	firstName?		: String|Object;
	lastName?		: String|Object;
	rememberToken?	: String|Object;
}

export interface iUserModel extends Document, iUser {
}

export interface iRepository{
	GetOne(p:Object):Promise<any>;
	GetAll(p:Object):Promise<any>;
	Create(p:Object):Promise<any>;
	Update(p:Object):Promise<any>;
	Delete(p:Object):Promise<any>;
}

export const UserEntity: iUser = {
	email			: {
		type		: String,
		trim		: true,
		index		: true,
		unique		: true,
		required	: true
	},
	firstName		: String,
	lastName		: String,
	rememberToken	: String,
};

let schemaOptions = {
	safe:true,
	timestamps: true
};

export const UserSchema: Schema = new Schema((<any>UserEntity),schemaOptions);

export const UserModel: Model<iUserModel> = model<iUserModel>("User", UserSchema);

export class UserRepository extends UserModel implements iRepository{
	GetOne({ id = null }):Promise<any>{
		return new Promise((Res,Rej)=>{
			return UserModel.findById(id, (err=null, User)=>{
				return ( err ) ? Rej(err.message) : Res(User);
			});
		});
	}

	GetAll({limit,offset}): Promise<any> {
		return new Promise((Res, Rej) => {
			return UserModel
			.find()
			.skip( offset )
			.limit( limit )
			.exec((err=null, Users) => {
				if( err)	Rej(err.message);

				let data = {
					count: Users.length,
					rows: Users,
					limit: limit,
					offset: offset,
				};

				return Res(data);
			});
		});
	}

	Create(params):Promise<any>{
		return new Promise((Res,Rej)=>{
			let newUser = new UserModel(params);
			return newUser.save((err=null, User) => {
				return (err) ? Rej(err.message) : Res(User);
			});
		});
	}

	Update(params):Promise<any>{
		return new Promise<any>((Res, Rej)=>{

			let {id} = params;

			return UserModel.findById(id, (err = null, User=null) => {
				if( err )	return Rej(err.message);
				if( !User )	return Rej(`non-existent User with id: ${id}`);

				let {
					email			=null,
					firstName		=null,
					lastName		=null,
					rememberToken	=null,
				} = params;

				if( email ){
					User.email = email;
				}
				if( firstName ){
					User.firstName = firstName;
				}
				if( lastName ){
					User.lastName = lastName;
				}
				if( rememberToken ){
					User.rememberToken = rememberToken;
				}

				return User.save((err=null,updatedUser=null)=>{
					if (err) return Rej(err.message);

					return Res(updatedUser);
				});
			});
		});
	}

	Delete({id}):Promise<any>{
		return new Promise((Res,Rej)=>{
			return UserModel.remove({ _id: id },(err=null)=>{
				return (err) ? Rej(err.message) : Res();
			});
		});
	}
}
