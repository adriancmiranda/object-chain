import test from 'ava';
import chain from '../index.next';

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
	range:(s, min, max) => `{${min||''},${max||''}}`,
	flags:(s, value) => new RegExp(s, value),
});

test('object-chain with regexp', t => {
	const reVariableChain = match.beginningOfInput.varchar.range(10, 12);
	const reVariable = reVariableChain.flags('gim')();
	t.true(reVariable instanceof RegExp, '"chain.flags" should return a Regular Expression');
	t.is(reVariableChain(), '^[$0-9A-Za-z_s]{10,12}', 'chain should be ^[$0-9A-Za-z_s]{10,12}');
});
