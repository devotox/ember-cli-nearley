import Service from '@ember/service';

import nearley from 'nearley';

import grammar from 'grammar';

export default Service.extend({
	compile(grammar) {
		return nearley.Grammar.fromCompiled(grammar);
	},

	createParser(g=grammar) {
		let compiled = this.compile(g);
		return new nearley.Parser(compiled);
	},

	parse(source, grammar) {
		let parser = this.createParser(grammar);

		try {
			return parser
				&& parser.feed(source)
				&& parser.results[0];
		} catch(e) {
			return '';
		}
	}
});
