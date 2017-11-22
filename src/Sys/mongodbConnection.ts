import * as mongoose from 'mongoose';

export default async function connectMongo():Promise<string>{
	const ENV = process.env.NODE_ENV.toUpperCase();
	const mongoAddress	= process.env[`MONGO_${ENV}_ADDRESS`];
	const mongoDatabase	= process.env[`MONGO_${ENV}_DATABASE`];
	const ConnectionUri	= `${mongoAddress}/${mongoDatabase}`;

	(<any>mongoose).Promise	= global.Promise;
	let conn:any;

	try {
		conn = await mongoose.connect(ConnectionUri, {useMongoClient: true});
	} catch ({name,message}) {

		console.error(`${name}: ${message}`);
		console.info('please update your connection settings in .env file and make your sure your mongodb service is running');
		process.exit(1)
	}

	return `${"\n"}Using: "${conn.name}" Database in ${conn.host}:${conn.port} MongoDB server`;
}
