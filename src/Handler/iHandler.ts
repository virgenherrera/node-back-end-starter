import {Router} from 'express';

export interface iHandler{
	name	: string;
	path	: string;
	router	: Router;
}
