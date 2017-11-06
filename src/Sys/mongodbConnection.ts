import * as mongoose from 'mongoose';

type connection = {
	name:	string;
	host: string;
	port: number;
}

export default async function connectMongo():Promise<string>{
	const ConnectUri = `${process.env.MONGODB_URI}/${process.env.MONGODB_COLLECTON}`;

	(<any>mongoose).Promise	= global.Promise;
	const conn:connection	= await mongoose.connect(ConnectUri, { useMongoClient: true });
	return `${"\n"}Using: "${conn.name}" Database in ${conn.host}:${conn.port} MongoDB`;
}
