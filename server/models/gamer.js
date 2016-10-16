'use strict';

var restEndpointConfigurer = require('../lib/utils/rest-endpoint-configurer');

module.exports = function (Gamer) {

  restEndpointConfigurer.allowDefaultCrudMethodsOnly(Gamer);

  // configure method for relations
  restEndpointConfigurer.allowDefaultCrudMethodsOnlyForRelation(Gamer, 'accessTokens');
  Gamer.disableRemoteMethod('__get__accessTokens', false);

  restEndpointConfigurer.allowDefaultCrudMethodsOnlyForRelation(Gamer, 'paintColors');
  restEndpointConfigurer.allowDefaultCrudMethodsOnlyForRelation(Gamer, 'roles');

  // user specific stuff (login, logout, etc.)
  Gamer.disableRemoteMethod('confirm', true); // GET /gamers/confirm
  Gamer.disableRemoteMethod('login', true); // POST /gamers/login
  Gamer.disableRemoteMethod('logout', true); // POST /gamers/logout
  Gamer.disableRemoteMethod('resetPassword', true); // POST /gamers/reset

};
