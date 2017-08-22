import * as path from "path";
const parentDir	= path.join( __dirname , '../' );

export interface iSysDirectory{
	base		: string;
	Business	: string;
	config		: string;
	Dto			: string;
	Examples	: string;
	Lib			: string;
	Middleware	: string;
	Migrations	: string;
	Models		: string;
	Repository	: string;
	Seeders		: string;
	Tasks		: string;
	Views		: string;
	Public		: string;
}

export class Directory implements iSysDirectory{
	public base;
	public Business;
	public config;
	public Dto;
	public Examples;
	public Lib;
	public Middleware;
	public Migrations;
	public Models;
	public Repository;
	public Seeders;
	public Tasks;
	public Views;
	public Public;

	constructor(){
		if( process.cwd() != parentDir.slice( 0 , -1 ) ){
			// declare parent directory (src) as workingDir
			process.chdir( parentDir );
		}

		const baseDir = process.cwd();

		this.base		= baseDir;
		this.Business	= path.join(baseDir,'/Business');
		this.config		= path.join(baseDir,'/config');
		this.Dto		= path.join(baseDir,'/Dto');
		this.Examples	= path.join(baseDir,'/Examples');
		this.Lib		= path.join(baseDir,'/Lib');
		this.Middleware	= path.join(baseDir,'/Middleware');
		this.Migrations	= path.join(baseDir,'/Migrations');
		this.Models		= path.join(baseDir,'/Models');
		this.Repository	= path.join(baseDir,'/Repository');
		this.Seeders	= path.join(baseDir,'/Seeders');
		this.Tasks		= path.join(baseDir,'/Tasks');
		this.Views		= path.join(baseDir,'/Views');
		this.Public		= path.join(baseDir,'/../public');
	}
}

let Dir = new Directory;
export default Dir;
