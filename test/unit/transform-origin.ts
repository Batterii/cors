import * as tranformPatternModule from '../../lib/transform-pattern';
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

	it('transforms a RegExp to a function', function() {
		const origin = /asdf/;
		const transformed = () => '';
		const transformPattern = sinon.stub(
			tranformPatternModule,
			'transformPattern',
		).returns(transformed);

		const result = transformOrigin(origin);

		expect(transformPattern).to.be.calledOnce;
		expect(transformPattern).to.be.calledWith(sinon.match.same(origin));
		expect(result).to.equal(transformed);
	});
});
