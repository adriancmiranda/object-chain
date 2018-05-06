const chain = require('object-chain');

const match = chain({
	beginningOfInput: '^',
	endOfInput: '$',
	anySingleCharacterExceptTheNewlineCharacter: '.',
	precedingExpressionZeroOrMoreTimes: '*',
	precedingExpressionOneOrMoreTimes: '+',
	precedingExpressionZeroOrOneTime: '?',
	or: '|',
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
	varchar: '[$0-9A-Za-z_\s]',
	pathchar: '[@$0-9a-zA-Z_\s-.\\/]',
	charset:(s, value) => `[${value}]`,
	size:(s, value) => `{${value}}`,
	group:(s, value) => `(${value})`,
	range:(s, min, max) => `{${min>>>0},${max>>>0}}`,
	flags:(s, value) => new RegExp(s, value),
});

const matchId = match.beginningOfInput.group('/d').range(3, 8).endOfInput.flags('i');
const rId = matchId();

rId.test('abc');
