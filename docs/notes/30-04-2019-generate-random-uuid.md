# notes on generating uuid  - draft
from https://github.com/felixge/node-formidable/pull/488/files


```js
const buf = crypto.randomBytes(16);
buf.toString('hex');
 ```

from [nodejs.org/api/crypto](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback)


## BBC dyalogeer

`uuid.js`

```js
// from https://github.com/bbc/dialogger/blob/c589a32a450d201cc2f67be1466816e029df33c5/helpers/uuid.js
var crypto = require('crypto');
module.exports = function(cb) {
  crypto.pseudoRandomBytes(16, function (err, raw) {
    cb(err, err ? undefined : raw.toString('hex'))
  });
}
```


## Cuid lib 

https://www.npmjs.com/package/cuid

