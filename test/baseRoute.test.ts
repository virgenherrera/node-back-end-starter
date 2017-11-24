
import chaiHttp = require('chai-http');
import { use, expect, request } from 'chai';
import App from '../src/Application';

use(chaiHttp);

describe('baseRoute', () => {
	it('should be text/html', ()=>{
		return request(App)
		.get('/')
		.then(res =>{
			expect(res).to.have.status(200);
			expect(res).to.be.html;
		});
	});
});
