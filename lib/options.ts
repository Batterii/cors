import { OriginOption } from './origin-option';
import koaCors from '@koa/cors';

export interface Options extends Omit<koaCors.Options, 'origin'> {
	origin?: OriginOption;
}
