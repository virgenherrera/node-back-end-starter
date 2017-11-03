import * as path from "path";
const parentDir	= path.join( __dirname , '../' );

export interface iProjectDirectories{
	Cwd			: string;
	Application	: string;
	Business	: string;
	config		: string;
	Dto			: string;
	Handler		: string;
	Middleware	: string;
	Models		: string;
	Repository	: string;
	Service		: string;
	Sys			: string;
	Base		: string;
	Examples	: string;
	Tasks		: string;
	Logs		: string;
	Views		: string;
	Public		: string;
	Migrations	: string;
	Seeders		: string;
	getPathToFile(p:string,f:string):string;
}

class Directories implements iProjectDirectories{
	public Cwd;
	public Application;
	public Business;
	public config;
	public Dto;
	public Handler;
	public Middleware;
	public Models;
	public Repository;
	public Service;
	public Sys;
	public Base;
	public Examples;
	public Tasks;
	public Logs;
	public Views;
	public Public;
	public Migrations;
	public Seeders;

	constructor(){
		if( process.cwd() != parentDir.slice( 0 , -1 ) ){
			// declare parent directory (src) as workingDir
			process.chdir( parentDir );
		}

		const baseDir = process.cwd();

		this.Cwd		= baseDir;
		this.Application= path.join(baseDir,'/Application');
		this.Business	= path.join(baseDir,'/Business');
		this.config		= path.join(baseDir,'/Config');
		this.Dto		= path.join(baseDir,'/Dto');
		this.Handler	= path.join(baseDir,'/Handler');
		this.Middleware	= path.join(baseDir,'/Middleware');
		this.Models		= path.join(baseDir,'/Models');
		this.Repository	= path.join(baseDir,'/Repository');
		this.Service	= path.join(baseDir,'/Service');
		this.Sys		= path.join(baseDir,'/Sys');
		this.Base		= path.join(baseDir,'../');
		this.Examples	= path.join(baseDir,'../examples');
		this.Tasks		= path.join(baseDir,'../gulpTasks');
		this.Logs		= path.join(baseDir,'../logs');
		this.Views		= path.join(baseDir,'../views');
		this.Public		= path.join(baseDir,'../public');
		this.Migrations	= path.join(baseDir,'../migrations');
		this.Seeders	= path.join(baseDir,'../seeders');
	}

	getPathToFile(dir:string,file:string|null):string{
		return ( dir in this ) ? path.join( this[ dir ] , file ) : null;
	}
}

export default new Directories;
