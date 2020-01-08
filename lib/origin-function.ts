import { Context } from 'koa';

export type OriginFunction =
	((ctx: Context) => string) | ((ctx: Context) => PromiseLike<string>);
