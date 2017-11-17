import { join }			from "path";
import { existsSync }	from "fs";
const parentDir			= join( __dirname , '../' );

export interface iProjectDirectories{
	Cwd			: string;
	Application	: string;
	Controller	: string;
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
	fileExists(p:string,f:string):boolean;
}

class Directories implements iProjectDirectories{
	public Cwd;
	public Application;
	public Controller;
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
		this.Application= join(baseDir,'/Application');
		this.Controller	= join(baseDir,'/Controller');
		this.config		= join(baseDir,'/Config');
		this.Dto		= join(baseDir,'/Dto');
		this.Handler	= join(baseDir,'/Handler');
		this.Middleware	= join(baseDir,'/Middleware');
		this.Models		= join(baseDir,'/Models');
		this.Repository	= join(baseDir,'/Repository');
		this.Service	= join(baseDir,'/Service');
		this.Sys		= join(baseDir,'/Sys');
		this.Base		= join(baseDir,'../');
		this.Examples	= join(baseDir,'../examples');
		this.Tasks		= join(baseDir,'../gulpTasks');
		this.Logs		= join(baseDir,'../logs');
		this.Views		= join(baseDir,'../views');
		this.Public		= join(baseDir,'../public');
		this.Migrations	= join(baseDir,'../migrations');
		this.Seeders	= join(baseDir,'../seeders');
	}

	getPathToFile(dir:string,file:string|null):string{
		return ( dir in this ) ? join( this[ dir ] , file ) : null;
	}

	fileExists(dir:string,file:string|null):boolean{

		return ( existsSync( join( this[ dir ] , file ) ) ) ;
	}
}

export default new Directories;
