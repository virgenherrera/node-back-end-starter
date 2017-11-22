import { join }			from "path";
import { existsSync }	from "fs";
const { cwd,chdir }		= process;
const parentDir			= join( __dirname , '../' );

class Directories{
	public Base:string;
	public Cwd:string;

	public Application:string;
	public config:string;
	public Controller:string;
	public Handler:string;
	public Lib:string;
	public Middleware:string;
	public Model:string;
	public Poco:string;
	public Repository:string;
	public Service:string;
	public Sys:string;

	public Examples:string;
	public Logs:string;
	public Migrations:string;
	public Public:string;
	public Seeders:string;
	public Tasks:string;
	public Views:string;

	constructor(){
		if( cwd() != parentDir.slice( 0 , -1 ) ){
			// declare parent directory (src) as workingDir
			chdir( parentDir );
		}

		const baseDir = cwd();

		this.Base		= join(baseDir,'../');
		this.Cwd		= baseDir;

		this.Application= join(baseDir,'/Application');
		this.config		= join(baseDir,'/Config');
		this.Controller	= join(baseDir,'/Controller');
		this.Handler	= join(baseDir,'/Handler');
		this.Lib		= join(baseDir,'/Lib');
		this.Middleware	= join(baseDir,'/Middleware');
		this.Model		= join(baseDir,'/Model');
		this.Poco		= join(baseDir,'/Poco');
		this.Repository	= join(baseDir,'/Repository');
		this.Service	= join(baseDir,'/Service');
		this.Sys		= join(baseDir,'/Sys');

		this.Examples	= join(baseDir,'../examples');
		this.Logs		= join(baseDir,'../logs');
		this.Migrations	= join(baseDir,'../migrations');
		this.Public		= join(baseDir,'../public');
		this.Seeders	= join(baseDir,'../seeders');
		this.Tasks		= join(baseDir,'../tasks');
		this.Views		= join(baseDir,'../views');
	}

	getPathToFile(dir:string,file:string|null):string{
		return ( dir in this ) ? join( this[ dir ] , file ) : null;
	}

	fileExists(dir:string,file:string|null):boolean{
		return ( existsSync( join( this[ dir ] , file ) ) ) ;
	}
}

export default new Directories;
