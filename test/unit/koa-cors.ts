import { expect } from 'chai';
import { koaCors } from '../../lib/koa-cors';
import original from '@koa/cors';

describe('koaCors', function() {
	it('is the function exported by @koa/cors', function() {
		expect(koaCors).to.equal(original);
	});
});
