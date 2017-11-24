import chaiHttp = require('chai-http');
import { use, expect, request } from 'chai';
import { correct,incorrect } from '../helpers/credentials';
import App from '../../src/Application';

use(chaiHttp);
describe('POST api/v1/login', () => {
	it('Should get 406 when the "content-type" header is different from "application / x-www-form-urlencoded"', async ()=>{
		try {
			await request(App)
			.post('/api/v1/login')
			.send(correct);
		} catch (E) {
			expect(E).to.have.status(406);
		}
	});

	it('Should get 401 when the erroneous credentials are sent', async ()=>{
		try {
			request(App)
			.post('/api/v1/login')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send(incorrect);
		} catch (E) {
			expect(E).to.have.status(401);
		}
	});

	it('Should get a token with the correct credentials', async ()=>{
		let res = await request(App)
		.post('/api/v1/login')
		.set('content-type', 'application/x-www-form-urlencoded')
		.send(correct);

		expect(res).to.be.json;
		expect(res).to.have.status(200);
		expect(res.body).to.have.all.keys(['status','success','message','data']);
		expect(res.body.data.token).to.exist;
	});
});
