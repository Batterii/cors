import { transformArray, transformPattern } from './transforms';
import { OriginFunction } from './origin-function';
import { OriginOption } from './origin-option';
import { isArray } from 'lodash';

export function transformOrigin(origin: OriginOption): string|OriginFunction {
	if (isArray(origin)) return transformArray(origin);
	if (origin instanceof RegExp) return transformPattern(origin);
	return origin;
}
