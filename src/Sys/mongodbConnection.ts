import Debug from './Debug';
import * as mongoose from 'mongoose';

type connection = {
	name:	string;
	host: string;
	port: number;
}

export default async function connectMongo():Promise<string>{
	const ConnectUri = `${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE}`;

	(<any>mongoose).Promise	= global.Promise;
	let conn:any;

	try {
		conn = await mongoose.connect(ConnectUri, { useMongoClient: true });
	} catch ({name,message}) {

		console.error(`${name}: ${message}`);
		console.info('please update your connection settings in .env file and make your sure your mongodb service is running');
		process.exit(1)
	}

	return `${"\n"}Using: "${conn.name}" Database in ${conn.host}:${conn.port} MongoDB`;
}
