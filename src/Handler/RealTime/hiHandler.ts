import { IoHandler } from '../../Service/SocketIoService';

class HiHandler extends IoHandler {
	constructor() {
		super();
	}

	onHi( name: string ) {
		if ( !this.io ) {
			return;
		}
		this.io.of('/').emit('hi', `Hi there ${name}!`);
	}
}

export default new HiHandler;
