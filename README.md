[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-nearley.svg)](http://emberobserver.com/addons/ember-cli-nearley)
[![Build Status](https://travis-ci.org/devotox/ember-cli-nearley.svg)](http://travis-ci.org/devotox/ember-cli-nearley)
[![Coverage Status](https://codecov.io/gh/devotox/ember-cli-nearley/branch/master/graph/badge.svg)](https://codecov.io/gh/devotox/ember-cli-nearley)
[![NPM Version](https://badge.fury.io/js/ember-cli-nearley.svg)](http://badge.fury.io/js/ember-cli-nearley)
[![NPM Downloads](https://img.shields.io/npm/dm/ember-cli-nearley.svg)](https://www.npmjs.org/package/ember-cli-nearley)
[![Dependency Status](https://david-dm.org/poetic/ember-cli-nearley.svg)](https://david-dm.org/poetic/ember-cli-nearley)
[![DevDependency Status](https://david-dm.org/poetic/ember-cli-nearley/dev-status.svg)](https://david-dm.org/poetic/ember-cli-nearley#info=devDependencies)
[![Greenkeeper](https://badges.greenkeeper.io/devotox/ember-cli-nearley.svg)](https://greenkeeper.io/)

ember-cli-nearley
==============================================================================

Simple Wrapper around [Nearley](https://github.com/Hardmath123/nearley).
This provides a service that can be used to parse source code and also automatically compiles
the index.ne file in app/grammar/

[DEMO](http://devotox.github.io/ember-cli-nearley)

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-nearley
```

Usage
------------------------------------------------------------------------------

```js
import Route from '@ember/routing/route';

import { inject } from '@ember/service';

export default Route.extend({
	nearley: inject(),

	actions: {
		onClick() {
			let value = this.controller.get('value');
			this.get('nearley').parse(value);
		}
	}
});
```

OR

```hbs
<div>
	{{#nearley-parse
		value=(concat input1 operator input2)
	as |computed|}}
		Result: {{computed}}
	{{/nearley-parse}}
</div>
```

* Note this also includes [Moo](https://github.com/no-context/moo) for tokenizing if needed
* To use tokens from a different file file must be called `tokens.js` within `app/grammar` directory
* and in your index.ne you must do this below. grammar-tokens is a shim created to allow you to import into your grammar.js file created from index.ne

```
@{%
	let moo = require('moo').default;

	let tokens = require('grammar-tokens').default;

	let lexer = moo.compile(tokens);
%}
# Pass your lexer object using the @lexer option:
@lexer lexer
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
