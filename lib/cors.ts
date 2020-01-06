import { Middleware } from 'koa';
import { Options } from './options';
import { koaCors } from './koa-cors';
import { transformOptions } from './tranform-options';

export function cors(options: Options): Middleware {
	return koaCors(transformOptions(options));
}
