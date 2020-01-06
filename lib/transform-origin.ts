import { OriginFunction } from './origin-function';
import { OriginOption } from './origin-option';
import { transformPattern } from './transform-pattern';

export function transformOrigin(option: OriginOption): string|OriginFunction {
	return option instanceof RegExp ? transformPattern(option) : option;
}
