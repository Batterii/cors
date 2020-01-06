import * as transformOriginModule from '../../lib/transform-origin';
import { Options } from '../../lib/options';
import { expect } from 'chai';
import sinon from 'sinon';
import { transformOptions } from '../../lib/tranform-options';

describe('tranformOptions', function() {
	it('returns a copy of the provided options object', function() {
		const options: Options = { foo: 'bar', baz: 'qux' } as any;

		const result = transformOptions(options);

		expect(result).to.deep.equal(options);
		expect(result).to.not.equal(options);
	});

	it('transforms origin option, if present', function() {
		const options: Options = { foo: 'bar', origin: 'origin' } as any;
		const transformed = () => '';
		const transformOrigin = sinon.stub(
			transformOriginModule,
			'transformOrigin',
		).returns(transformed);

		const result = transformOptions(options);

		expect(transformOrigin).to.be.calledOnce;
		expect(transformOrigin).to.be.calledWith(options.origin);
		expect(result).to.deep.equal({ foo: 'bar', origin: transformed });
	});
});
