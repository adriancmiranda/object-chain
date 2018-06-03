# object-chain
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fadriancmiranda%2Fobject-chain.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fadriancmiranda%2Fobject-chain?ref=badge_shield)

> Create objects with chainable properties

# Usage
> [_playground_](https://npm.runkit.com/object-chain)

```js
const objectChain = require('object-chain');

const match = objectChain({
  beginningOfInput: '^',
  endOfInput: '$',
  anySingleCharExceptTheNewline: '.',
  zeroOrMoreTimes: '*',
  oneOrMoreTimes: '+',
  zeroOrOneTime: '?',
  or: '|',
  escapeChar: '\\',
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
  lowerCase: '[a-z]',
  upperCase: '[A-Z]',
  letter: '[a-zA-Z]',
  number: '[0-9]',
  varchar: '[$0-9A-Za-z_\\s]',
  pathChar: '[@$0-9a-zA-Z_\\s-.\\/]',
  value: (self, last, value) => `${self}${value}`,
  controlChar: (self, last, value) => `${self}\\c${value}`,
  notRemember: (self, last, value) => `${self}(?:${value})`,
  ifFollowedBy: (self, last, value) => `${self}(?=${value})`,
  ifNotFollowedBy: (self, last, value) => `${self}(?!${value})`,
  notCharset: (self, last, value) => `${self}[^${value}]`,
  charset: (self, last, value) => `${self}[${value}]`,
  size: (self, last, value) => `${self}{${value>>>0}}`,
  atLeast: (self, last, value) => `${self}{${value>>>0},}`,
  atMost: (self, last, value) => `${self}{,${value>>>0}}`,
  group: (self, last, value) => `${self}(${value})`,
  range: (self, last, min, max) => `${self}{${min>>>0},${max>>>0}}`,
  flags: (self, last, value) => new RegExp(self, value),
});

const matchId = match.beginningOfInput.varchar.range(3, 8).endOfInput.flags('i');
const rId = matchId();

rId.test('abc');

```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fadriancmiranda%2Fobject-chain.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fadriancmiranda%2Fobject-chain?ref=badge_large)