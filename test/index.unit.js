import test from 'ava';
import objectChain from '../index.next';

const match = objectChain({
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
	alphanumeric: '\\w',
	nonWordChar: '\\W',
	nil: '\\0',
	upercaseVowel: '[AEIOU]',
	lowercaseVowel: '[aeiou]',
	uppercaseConsonant: '[B-DF-HJ-NP-TV-Z]',
	lowercaseConsonant: '[b-df-hj-np-tv-z]',
	lowercase: '[a-z]',
	uppercase: '[A-Z]',
	letter: '[a-zA-Z]',
	numeric: '[0-9]',
	varchar: '[$0-9A-Za-z_\\s]',
	eol: '(?:(?:\\n)|(?:\\r\\n))',
	value: (self, value) => value,
	controlChar: (self, value) => `\\c${value}`,
	notRemember: (self, value) => `(?:${value})`,
	ifFollowedBy: (self, value) => `(?=${value})`,
	ifNotFollowedBy: (self, value) => `(?!${value})`,
	notCharset: (self, value) => `[^${value}]`,
	charset: (self, value) => `[${value}]`,
	size: (self, value) => `{${0 | value}}`,
	atLeast: (self, value) => `{${0 | value},}`,
	atMost: (self, value) => `{,${0 | value}}`,
	group: (self, value) => `(${value})`,
	range: (self, min, max) => `{${0 | min},${0 | max}}`,
	flags: (self, value) => new RegExp(self, value),
});

test('object-chain with regexp', t => {
	const rxPath = match.charset('@$0-9a-zA-Z_\\s-.\\/').oneOrMoreTimes;
	const reVariableChain = match.beginningOfInput.varchar.group(rxPath).group(match.whiteSpace).range(10, 12);
	const reVariable = reVariableChain.flags('gim')();
	t.true(reVariable instanceof RegExp, '"chain.flags" should return a Regular Expression');
	t.is(reVariableChain(), '^[$0-9A-Za-z_\\s]([@$0-9a-zA-Z_\\s-.\\/]+)(\\s){10,12}', 'chain should be ^[$0-9A-Za-z_\\s]([@$0-9a-zA-Z_\\s-.\\/]+)(\\s){10,12}');
});

test('object-chain chain of fns', t=> {
	const rxPath = match.charset('@$0-9a-zA-Z_\\s-.\\/').oneOrMoreTimes;
	const rxNamedExpression = match
		.group(match.value('import').or.value('export')).zeroOrOneTime
		.group(match.whiteSpace.oneOrMoreTimes).zeroOrOneTime
		.group(match.escape.value('{'))
		.group(match.whiteSpace.zeroOrMoreTimes)
		.group(match.varchar.zeroOrMoreTimes.notCharset(match.whiteSpace))
		.group(match.whiteSpace.zeroOrMoreTimes)
		.group(match.escape.value('}'))
		.group(match.whiteSpace.oneOrMoreTimes)
		.group('from')
		.group(match.whiteSpace.oneOrMoreTimes)
		.group(match.charset('\'"`'))
		.group(rxPath)
		.group(match.charset('\'"`')).zeroOrOneTime
	;
	const reNamedExpression = rxNamedExpression.flags('gm')();
	const raw = /(import|export)?(\s+)?(\{)(\s*)([$0-9A-Za-z_\s]*[^\s])(\s*)(\})(\s+)(from)(\s+)(['"`])([@$0-9a-zA-Z_\s-.\/]+)(['"`])?/gm;
	t.true(reNamedExpression instanceof RegExp, 'should be a instance of RegExp');
	t.is(reNamedExpression.source, raw.source, `should be equal to ${raw.source}`);
	t.is(reNamedExpression.flags, raw.flags, 'should be "gm"');
});
