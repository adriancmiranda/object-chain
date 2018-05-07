# object-chain
> Create objects with chainable properties

# Usage

```js
const chain = require('object-chain');

const match = chain({
  beginningOfInput: '^',
  endOfInput: '$',
  anySingleCharExceptTheNewline: '.',
  zeroOrMoreTimes: '*',
  oneOrMoreTimes: '+',
  zeroOrOneTime: '?',
  or: '|',
  escape: '\\',
  backslash: '\\',
  backspace: '\\b',
  nonWordBoundary: '\\B',
  digit: '\\d',
  nonDigitChar: '\\D',
  formFeed: '\\f',
  lineFeed: '\\n',
  carriageReturn: '\\r',
  whiteSpace: '\\s',
  tab: '\\t',
  verticalTab: '\\v',
  alphanumericChar: '\\w',
  nonWordChar: '\\W',
  nil: '\\0',
  varchar: '[$0-9A-Za-z_\\s]',
  pathchar: '[@$0-9a-zA-Z_\\s-.\\/]',
  value: (self, value) => value,
  controlChar: (self, value) => `\\c${value}`,
  notRemember: (self, value) => `(?:${value})`,
  ifFollowedBy: (self, value) => `(?=${value})`,
  ifNotFollowedBy: (self, value) => `(?!${value})`,
  notCharset: (self, value) => `[^${value}]`,
  charset: (self, value) => `[${value}]`,
  size: (self, value) => `{${value>>>0}}`,
  atLeast: (self, value) => `{${value>>>0},}`,
  atMost: (self, value) => `{,${value>>>0}}`,
  group: (self, value) => `(${value})`,
  range: (self, min, max) => `{${min>>>0},${max>>>0}}`,
  flags: (self, value) => new RegExp(self, value),
});

const matchId = match.beginningOfInput.varchar.range(3, 8).endOfInput.flags('i');
const rId = matchId();

rId.test('abc');

```
