(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['nearley'],
      __esModule: true,
    };
  }

  define('nearley', [], vendorModule);
})();
