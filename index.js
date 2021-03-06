'use strict';

const fs = require('fs');
const { name } = require('./package');

const nearley = require('nearley');
const compile = require('nearley/lib/compile');
const generate = require('nearley/lib/generate');
const nearleyGrammar = require('nearley/lib/nearley-language-bootstrapped');

module.exports = {
    name,
	options: {
		'ember-cli-babel': {
			compileModules: true,
			includePolyfill: true,
			disableDebugTooling: true
		}
	},

	included() {
		this._super.included.apply(this, arguments);

		this.import('vendor/shims/moo.js');
		this.import('vendor/shims/nearley.js');

		this.import('vendor/shims/grammar-tokens.js'); // must be before grammar
		this.import('vendor/shims/grammar.js');

		this.import('node_modules/moo/moo.js');
		this.import('node_modules/nearley/lib/nearley.js');

		const compiled = compileGrammar();
		const { sourceCreated, tokensCreated } = compiled

		if(tokensCreated) { this.import('vendor/grammar-tokens.js'); }
		if(sourceCreated) { this.import('vendor/grammar.js'); }
	}
};



const compileGrammar = () => {
	let sourceCreated = false;
	let tokensCreated = false;

	let grammarFile = 'app/grammar/index.ne';
	let tokensFile = 'app/grammar/tokens.js';
	let defaultGrammarFile = 'app/grammar/index.default.ne';

	console.log(''); // eslint-disable-line
	console.log('[Nearley] Grammar File Found:', fs.existsSync(grammarFile)); // eslint-disable-line
	console.log('[Nearley] Tokens File Found:', fs.existsSync(tokensFile));   // eslint-disable-line
	console.log(''); // eslint-disable-line

	if(!fs.existsSync(grammarFile)) { 
		grammarFile = defaultGrammarFile; 
	}

	if(fs.existsSync(grammarFile)) {
		let sourceCode = fs.readFileSync(grammarFile, 'utf8');

		// Parse the grammar source into an AST
		const grammarParser = new nearley.Parser(nearleyGrammar);
		grammarParser.feed(sourceCode);
		const grammarAst = grammarParser.results[0]; // TODO check for errors

		// Compile the AST into a set of rules
		const grammarInfoObject = compile(grammarAst, {});

		// Generate JavaScript code from the rules
		const grammarJs = generate(grammarInfoObject, 'grammar');

		fs.writeFileSync('vendor/grammar.js', grammarJs);
		sourceCreated = true;
	}

	if(fs.existsSync(tokensFile)) {
		let tokensCode = fs.readFileSync(tokensFile, 'utf8');
		tokensCode = tokensCode.replace('root.tokens', 'root[\'grammar-tokens\']');

		fs.writeFileSync('vendor/grammar-tokens.js', tokensCode);
		tokensCreated = true;
	}

	return { sourceCreated, tokensCreated };
};