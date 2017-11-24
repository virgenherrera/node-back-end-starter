import {
	commonExpectedKeys,
	extendedExpectedKeys,
	requestToken,
	genRandPersistenceId,
} from '../helpers/helpers';
import chaiHttp = require('chai-http');
import { use, expect, request } from 'chai';
import App from '../../src/Application';
import {dd} from '../../src/Sys/Debug';

const newUser = {
	firstName	: "Ñandu",
	latName	: "Ñandu",
	email	: "seniornandu@domain.com",
	password	: "111111",
	role	: "user",
};

use(chaiHttp);
describe('GET api/v1/users', ()=>{
	let token;

	beforeEach(async ()=>{
		token = ( token ) ? token : await requestToken(App);
	});

	it(`Should be json have status 200 to have all '${extendedExpectedKeys.join("',")}' keys when token is sent`, async ()=>{
		let res = await request(App)
		.get('/api/v1/users')
		.set('token', token);

		expect(res).to.be.json;
		expect(res).to.have.status(200);
		expect(res.body).to.have.all.keys( extendedExpectedKeys );
		expect(res.body.data).to.be.an('array');
	});

	it('Should get 404 when request for an non-existent item', async ()=>{
		try {
			await request(App)
			.get(`/api/v1/users/${genRandPersistenceId()}`)
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('token', token);
		} catch (E) {
			expect(E).to.have.status(404);
		}
	});

	it('Should create a new user', async ()=>{
		let res = await request(App)
		.post('/api/v1/users')
		.set('content-type', 'application/x-www-form-urlencoded')
		.set('token', token)
		.send( newUser );


		expect(res).to.be.json;
		expect(res).to.have.status(201);
		expect(res.body).to.have.all.keys( commonExpectedKeys );
		expect(res.body.data).to.exist;

		// expect(res.body.data).to.have.keys( Object.keys(newUser) )
	});
});
