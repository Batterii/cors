import { Context } from 'koa';
import { OriginFunction } from './origin-function';

export function transformArray(origins: string[]): OriginFunction {
	return (ctx: Context): string => {
		const origin = ctx.get('Origin');
		return origins.includes(origin) ? origin : '';
	};
}

export function transformPattern(pattern: RegExp): OriginFunction {
	return (ctx: Context): string => {
		const origin = ctx.get('Origin');
		return pattern.test(origin) ? origin : '';
	};
}
