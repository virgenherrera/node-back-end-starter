import * as path from "path";
const parentDir	= path.join( __dirname , '../' );

export interface iProjectDirectories{
	base		: string;
	Business	: string;
	config		: string;
	Dto			: string;
	Examples	: string;
	Handler		: string;
	Lib			: string;
	Middleware	: string;
	Models		: string;
	Repository	: string;
	Tasks		: string;
	Views		: string;
	Public		: string;
	Migrations	: string;
	Seeders		: string;
}

export class Directories implements iProjectDirectories{
	public base;
	public Business;
	public config;
	public Dto;
	public Examples;
	public Handler;
	public Lib;
	public Middleware;
	public Models;
	public Repository;
	public Tasks;
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

		this.base		= baseDir;
		this.Business	= path.join(baseDir,'/Business');
		this.config		= path.join(baseDir,'/Config');
		this.Dto		= path.join(baseDir,'/Dto');
		this.Examples	= path.join(baseDir,'/Examples');
		this.Handler	= path.join(baseDir,'/Handler');
		this.Lib		= path.join(baseDir,'/Lib');
		this.Middleware	= path.join(baseDir,'/Middleware');
		this.Models		= path.join(baseDir,'/Models');
		this.Repository	= path.join(baseDir,'/Repository');
		this.Tasks		= path.join(baseDir,'/Tasks');
		this.Views		= path.join(baseDir,'../views');
		this.Public		= path.join(baseDir,'../public');
		this.Migrations	= path.join(baseDir,'../Migrations');
		this.Seeders	= path.join(baseDir,'../Seeders');
	}
}

export default new Directories;
