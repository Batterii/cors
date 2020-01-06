import { Context } from 'koa';

export interface OriginFunction {
	(ctx: Context): string;
}
