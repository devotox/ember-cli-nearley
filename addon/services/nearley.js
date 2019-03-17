import nearley from 'nearley';

import grammar from 'grammar';

import Service from '@ember/service';

export default Service.extend({
	compile(g = grammar) {
		try {
			return nearley.Grammar.fromCompiled(g);
		} catch(e) {
			console.error('Nearley Compile Error', e); // eslint-disable-line
			return '';
		}
	},

	createParser(g = grammar) {
		try {
			let compiled = this.compile(g);
			return new nearley.Parser(compiled);
		} catch(e) {
			console.error('Nearley Parser Create Error', e); // eslint-disable-line
			return '';
		}
	},

	parse(source, grammar) {
		let parser = this.createParser(grammar);

		try {
			return parser
				&& parser.feed(source)
				&& parser.results[0];
		} catch(e) {
			console.error('Nearley Parse Error', e); // eslint-disable-line
			return '';
		}
	}
});
