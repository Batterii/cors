import { Options } from './options';
import koaCors from '@koa/cors';
import { omit } from 'lodash';
import { transformOrigin } from './transform-origin';

export function transformOptions(options: Options): koaCors.Options {
	const result = omit(options, 'origin') as koaCors.Options;
	if (options.origin) result.origin = transformOrigin(options.origin);
	return result;
}
