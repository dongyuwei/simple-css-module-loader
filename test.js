const assert = require('assert');
const cssLoader = require('./simple-css-loader');

var hash = '87bd5362';
var expected = `.foo[${hash}] {
  color: green;
}

.bar[${hash}] {
  color: red;
}

.foo[87bd5362] .bar[87bd5362] {
  display: block;
}`;

var transformed = cssLoader.transformCss('./foo.css');
assert.equal(transformed.hash, hash);
console.log(transformed.css, '\n\n');
assert.equal(transformed.css, expected);

var transformed2 = cssLoader.transformCssUsingUuid('./foo.css');
var expected2 = `._87bd5362__foo {
  color: green;
}

._87bd5362__bar {
  color: red;
}

._87bd5362__foo ._87bd5362__bar {
  display: block;
}`;

assert.equal(transformed2.hash, hash);
console.log(transformed2.css, '\n\n');
assert.equal(transformed2.css, expected2);