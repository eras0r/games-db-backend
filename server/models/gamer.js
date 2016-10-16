'use strict';

module.exports = function (Gamer) {

  // Gamer.disableRemoteMethod('find', true); // GET /gamers
  // Gamer.disableRemoteMethod('findById', true); // GET /gamers/{id}
  // Gamer.disableRemoteMethod('create', true); // POST /gamers
  // Gamer.disableRemoteMethod('updateAttributes', false); // PUT/PATCH -> gamers/{id}
  // Gamer.disableRemoteMethod('deleteById', true); // DELETE /gamers/{id}

  // Gamer.disableRemoteMethod('count', true); // GET /gamers/count
  // Gamer.disableRemoteMethod('exists', true); // HEAD /gamers/{id} GET /gamers/{id}/exists

  Gamer.disableRemoteMethod('upsert', true); // PUT/PATCH /gamers
  Gamer.disableRemoteMethod('updateAll', true); // POST /gamers/update

  Gamer.disableRemoteMethod('findOne', true); // GET /gamers/findOne

  Gamer.disableRemoteMethod('replaceById', true); // POST /gamers/{id}/replace
  Gamer.disableRemoteMethod('replaceOrCreate', true); // POST /gamers/replaceOrCreate
  Gamer.disableRemoteMethod('createChangeStream', true); // GET/POST /gamers/change-stream
  Gamer.disableRemoteMethod('upsertWithWhere', true); // POST /gamers/upsertWithWhere

  Gamer.disableRemoteMethod('count', true); // GET /gamers/count
  Gamer.disableRemoteMethod('exists', true); // HEAD /gamers/{id} GET /gamers/{id}/exists

  // relation (accessToken)
  Gamer.disableRemoteMethod('__count__accessTokens', false); // GET /gamers/{id}/accessTokens/count
  Gamer.disableRemoteMethod('__create__accessTokens', false); // POST /gamers/{id}/accessTokens
  Gamer.disableRemoteMethod('__delete__accessTokens', false); // DELETE /gamers/{id}/accessTokens
  Gamer.disableRemoteMethod('__destroyById__accessTokens', false); // DELETE /gamers/{id}/accessTokens/{fk}
  Gamer.disableRemoteMethod('__findById__accessTokens', false); // GET /gamers/{id}/accessTokens/{fk}
  // Gamer.disableRemoteMethod('__get__accessTokens', false); // GET /gamers/{id}/accessTokens
  Gamer.disableRemoteMethod('__updateById__accessTokens', false); // PUT /gamers/{id}/accessTokens/{fk}

  // user specific stuff (login, logout, etc.)
  // Gamer.disableRemoteMethod('confirm', true); // GET /gamers/confirm
  // Gamer.disableRemoteMethod('login', true); // POST /gamers/login
  // Gamer.disableRemoteMethod('logout', true); // POST /gamers/logout
  // Gamer.disableRemoteMethod('resetPassword', true); // POST /gamers/reset

};
