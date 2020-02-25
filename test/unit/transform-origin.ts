import * as transforms from '../../lib/transforms';
import { expect } from 'chai';
import sinon from 'sinon';
import { transformOrigin } from '../../lib/transform-origin';

describe('transformOrigin', function() {
	it('returns a string directly', function() {
		const origin = 'some origin';

		expect(transformOrigin(origin)).to.equal(origin);
	});

	it('returns a function directly', function() {
		const origin = () => '';

		expect(transformOrigin(origin)).to.equal(origin);
	});

	it('transforms an array to a function', function() {
		const origin: string[] = [];
		const transformed = () => '';
		const transformArray = sinon.stub(transforms, 'transformArray')
			.returns(transformed);

		const result = transformOrigin(origin);

		expect(transformArray).to.be.calledOnce;
		expect(transformArray).to.be.calledWith(sinon.match.same(origin));
		expect(result).to.equal(transformed);
	});

	it('transforms a RegExp to a function', function() {
		const origin = /asdf/;
		const transformed = () => '';
		const transformPattern = sinon.stub(transforms, 'transformPattern')
			.returns(transformed);

		const result = transformOrigin(origin);

		expect(transformPattern).to.be.calledOnce;
		expect(transformPattern).to.be.calledWith(sinon.match.same(origin));
		expect(result).to.equal(transformed);
	});
});
