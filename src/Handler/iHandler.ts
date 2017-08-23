import {Router} from 'express';

export default interface iHandler{
	name	: string;
	path	: string;
	router	: Router;
}
