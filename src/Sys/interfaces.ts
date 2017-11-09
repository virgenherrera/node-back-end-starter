import { Router } from "express";
import { UserRepository } from '../Model/user'


export interface iHandler{
	readonly name:string;
	readonly path:string;
	router:Router;
}

export interface iRestHandler extends iHandler{
	readonly controller:object;
	getAllHandler(...args:any[])	:any;
	getOneHandler(...args:any[])	:any;
	postHandler(...args:any[])		:any;
	putHandler(...args:any[])		:any;
	deleteHandler(...args:any[])	:any;
}

export interface iController{
	readonly repository	:UserRepository;
	createAction	(p:object):Promise<any>;
	listAction		(p:object):Promise<any>;
	showAction		(p:object):Promise<any>;
	editAction		(p:object):Promise<any>;
	deleteAction	(p:object):Promise<any>;
}
