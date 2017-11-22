import { Router } from "express";


export interface iHandler{
	readonly name:string;
	readonly path:string;
	router:Router;
}

export interface iRestHandler extends iHandler{
	readonly controller:object;
	getAllHandler?(...args:any[])	:any;
	getOneHandler?(...args:any[])	:any;
	postHandler?(...args:any[])		:any;
	putHandler?(...args:any[])		:any;
	deleteHandler?(...args:any[])	:any;
}

export interface iController{
	readonly repository	:object;
	createAction?	(p:object):Promise<any>;
	listAction?		(p:object):Promise<any>;
	showAction?		(p:object):Promise<any>;
	editAction?		(p:object):Promise<any>;
	deleteAction?	(p:object):Promise<any>;
}

export interface iRepository{
	GetById?(p:object):Promise<object>;
	FindOne?(p:object):Promise<object>;
	GetAll?(p:object):Promise<object>;
	Create?(p:object):Promise<object>;
	Update?(p:object):Promise<object>;
	Delete?(p:object):Promise<object>;
}

export interface iResDto{
	status	: number;
	success	: boolean;
	message	: string;
	data?	: object|object[];
	limit?	: number;
	offset?	: number;
	count?	: number;
};
