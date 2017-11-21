(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['moo'],
      __esModule: true,
    };
  }

  define('moo', [], vendorModule);
})();
