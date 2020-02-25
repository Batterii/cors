# @batterii/cors
This module is a wrapper around [@koa/cors][1] which adds additional features
needed by Batterii.


## Rationale
We should consider opening up PR's for these features on `@koa/cors` in the
future. The GitHub repo for `@koa/cors`, however, has several stagnant pull
requests-- including a minor bug fix of my own-- so we can't really depend on
the maintainers to respond promptly to our requests. For now it's quicker to
just put them here.


## Convenience `origin` Options.
For now, the only features added by this wrapper is better typings, and support
for arrays and regexp patterns in the `origin` option.

### Array Origins
Instead of specifying a single origin to allow, you can specify an array of
them like so:

```ts
import { cors } from '@batterii/cors';

koa.use(cors({
	origin: [ 'https://my-host.com', 'https://my-other-host.com' ],
}));
```

This will allow cross-origin requests from pages served at either of the above
origins.


### Regex Origins
You can also sepcify your allowed origins as a regex pattern like so:

```js
import { cors } from '@batterii/cors';

koa.use(cors({
	origin: /^https?:\/\/localhost(?::\d+)?\/?$/
}));
```

This will allow cross-origin requests from pages served over both HTTP and HTTPS
from `localhost`, regardless of port number.

[1]: https://www.npmjs.com/package/@koa/cors
