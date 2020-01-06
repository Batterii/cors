import * as koaCorsModule from '../../lib/koa-cors';
import * as transformOptionsModule from '../../lib/tranform-options';
import { Options as KoaCorsOptions } from '@koa/cors';
import { Middleware } from 'koa';
import { Options } from '../../lib/options';
import { cors } from '../../lib/cors';
import { expect } from 'chai';
import sinon from 'sinon';

describe('cors', function() {
	let options: Options;
	let transformed: KoaCorsOptions;
	let transformOptions: sinon.SinonStub;
	let middleware: Middleware;
	let koaCors: sinon.SinonStub;
	let result: Middleware;

	beforeEach(function() {
		options = {};
		transformed = {};
		transformOptions = sinon.stub(
			transformOptionsModule,
			'transformOptions',
		).returns(transformed);
		middleware = () => undefined;
		koaCors = sinon.stub(koaCorsModule, 'koaCors').returns(middleware);

		result = cors(options);
	});

	it('transforms the provided options', function() {
		expect(transformOptions).to.be.calledOnce;
		expect(transformOptions).to.be.calledWith(sinon.match.same(options));
	});

	it('invokes koa cors with transformed options', function() {
		expect(koaCors).to.be.calledOnce;
		expect(koaCors).to.be.calledWith(sinon.match.same(transformed));
	});

	it('returns middleware from the koa cors invocation', function() {
		expect(result).to.equal(middleware);
	});
});
