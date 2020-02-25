import { transformArray, transformPattern } from '../../lib/transforms';
import { Context } from 'koa';
import { OriginFunction } from '../../lib/origin-function';
import { expect } from 'chai';
import sinon from 'sinon';

describe('transforms', function() {
	describe('transformArray', function() {
		let origins: string[];
		let result: OriginFunction;

		beforeEach(function() {
			origins = [];
			result = transformArray(origins);
		});

		it('returns a function', function() {
			expect(result).to.be.a('function');
		});

		describe('returned function', function() {
			const origin = 'origin header';
			let ctx: Context;
			let get: sinon.SinonStub;
			let includes: sinon.SinonStub;

			beforeEach(function() {
				get = sinon.stub().named('get').returns(origin);
				ctx = { get } as any;
				includes = sinon.stub(origins, 'includes').returns(false);
			});

			it('gets the Origin header from the context', function() {
				result(ctx);

				expect(get).to.be.calledOnce;
				expect(get).to.be.calledOn(ctx);
				expect(get).to.be.calledWith('Origin');
			});

			it('checks if the array includes the origin header', function() {
				result(ctx);

				expect(includes).to.be.calledOnce;
				expect(includes).to.be.calledOn(origins);
				expect(includes).to.be.calledWith(origin);
			});

			it('returns an empty string if origin is not included', function() {
				expect(result(ctx)).to.equal('');
			});

			it('returns the origin header if it is included', function() {
				includes.returns(true);

				expect(result(ctx)).to.equal(origin);
			});
		});
	});

	describe('transformPattern', function() {
		let pattern: RegExp;
		let result: OriginFunction;

		beforeEach(function() {
			pattern = /asdf/;
			result = transformPattern(pattern);
		});

		it('returns a function', function() {
			expect(result).to.be.a('function');
		});

		describe('returned function', function() {
			const origin = 'origin header';
			let ctx: Context;
			let get: sinon.SinonStub;
			let test: sinon.SinonStub;

			beforeEach(function() {
				get = sinon.stub().named('get').returns(origin);
				ctx = { get } as any;
				test = sinon.stub(pattern, 'test').returns(false);
			});

			it('gets the Origin header from the context', function() {
				result(ctx);

				expect(get).to.be.calledOnce;
				expect(get).to.be.calledOn(ctx);
				expect(get).to.be.calledWith('Origin');
			});

			it('tests the origin against the pattern', function() {
				result(ctx);

				expect(test).to.be.calledOnce;
				expect(test).to.be.calledOn(pattern);
				expect(test).to.be.calledWith(origin);
			});

			it('returns an empty string if test returns false', function() {
				expect(result(ctx)).to.equal('');
			});

			it('returns the origin header if test returns true', function() {
				test.returns(true);

				expect(result(ctx)).to.equal(origin);
			});
		});
	});
});
