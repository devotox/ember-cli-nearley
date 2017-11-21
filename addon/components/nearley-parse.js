import { inject } from '@ember/service';

import { computed } from '@ember/object';

import Component from '@ember/component';

import layout from '../templates/components/nearley-parse';

export default Component.extend({
	layout,

	value: null,

	nearley: inject(),

	didReceiveAttrs() {
		this.get('computedValue');
	},

	computedValue: computed('value', function() {
		let value = this.get('value');
		return this.get('nearley').parse(value);
	})
});
