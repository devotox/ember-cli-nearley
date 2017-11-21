(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['grammar'],
      __esModule: true,
    };
  }

  define('grammar', [], vendorModule);
})();
