import {hashSync,genSaltSync} from "bcryptjs";
import { Document, Schema, Model, model } from "mongoose";
import {isEmail} from "../Sys/validations";
// only for debugging
// import Debug from "../Sys/Debug";

export interface iUser{
	firstName		: string;
	lastName		: string;
	email			: string;
	password		: string;
	role			: string;
	rememberToken	: string;
}

interface iUserModel extends iUser,Document{
	// Define Models Contracts here!
}

export const UserSchema: Schema = new Schema({
	firstName		: {
		type		: String,
	},
	lastName		: {
		type		: String,
	},
	email			: {
		type		: String,
		unique		: true,
		index		: true,
		trim		: true,
		lowercase	: true,
		required	: true,
		validate	: {
			validator: isEmail,
			message	: '{VALUE} is not a valid email!'
		},
	},
	password		: {
		type		: String,
		required	: true,
		trim		: true,
		select		: false,
		set			: val => hashSync(val, genSaltSync(12) ),
	},
	role			: {
		type		: String,
		trim		: true,
		lowercase	: true,
		default		: 'user'
	},
	rememberToken	: {
		type		: String,
		select		: false,
	},
},
{
	safe:true,
	timestamps: true
});

export const UserModel: Model<iUserModel> = model<iUserModel>("User", UserSchema);
