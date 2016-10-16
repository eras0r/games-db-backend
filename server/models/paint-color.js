'use strict';

var restEndpointConfigurer = require('../lib/utils/rest-endpoint-configurer');

module.exports = function (PaintColor) {

  restEndpointConfigurer.allowDefaultCrudMethodsOnly(PaintColor);

};
