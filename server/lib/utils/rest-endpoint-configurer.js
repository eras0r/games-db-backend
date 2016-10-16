'use strict';

/**
 * Helper to configure REST Endpoints by disabling not required methods.
 * @type {{}}
 */
var restEndpointConfigurer = {};

/**
 * Disables all non default CRUD operations for an entity. The following methods are considered default CRUD methods
 * and won't be disabled (assuming our entity is named 'things'):
 *
 * <table>
 * <tr>
 *     <th>HTTP Method</th>
 *     <th>Url</th>
 * </tr>
 * <tr>
 *     <td>GET</td>
 *     <td>/things</td>
 * </tr>
 * <tr>
 *     <td>GET</td>
 *     <td>/things/{id}</td>
 * </tr>
 * <tr>
 *     <td>POST</td>
 *     <td>/things</td>
 * </tr>
 * <tr>
 *     <td>PUT/PATCH</td>
 *     <td>/things/{id}</td>
 * </tr>
 * <tr>
 *     <td>DELETE</td>
 *     <td>/things/{id}</td>
 * </tr>
 * <tr>
 *     <td>GET</td>
 *     <td>/things/count</td>
 * </tr>
 * <tr>
 *     <td>HEAD</td>
 *     <td>/things/{id}</td>
 * </tr>
 * <tr>
 *     <td>GET</td>
 *     <td>/things/{id}/exists</td>
 * </tr>
 * </table>
 * @param entity the entity for which to configure the REST endpoint
 */
restEndpointConfigurer.allowDefaultCrudMethodsOnly = function (entity) {

  // the following methods are considered default CRUD methods and won't be dsiabled
  // entity.disableRemoteMethod('find', true); // GET /things
  // entity.disableRemoteMethod('findById', true); // GET /things/{id}
  // entity.disableRemoteMethod('create', true); // POST /things
  // entity.disableRemoteMethod('updateAttributes', false); // PUT/PATCH -> things/{id}
  // entity.disableRemoteMethod('deleteById', true); // DELETE /things/{id}
  // entity.disableRemoteMethod('count', true); // GET /things/count

  entity.disableRemoteMethod('exists', true); // HEAD /things/{id} GET /things/{id}/exists

  entity.disableRemoteMethod('upsert', true); // PUT/PATCH /things
  entity.disableRemoteMethod('updateAll', true); // POST /things/update

  entity.disableRemoteMethod('findOne', true); // GET /things/findOne

  entity.disableRemoteMethod('replaceById', true); // POST /things/{id}/replace
  entity.disableRemoteMethod('replaceOrCreate', true); // POST /things/replaceOrCreate
  entity.disableRemoteMethod('createChangeStream', true); // GET/POST /things/change-stream
  entity.disableRemoteMethod('upsertWithWhere', true); // POST /things/upsertWithWhere

};

/**
 * Disables all non default CRUD operations. The following methods are considered default CRUD methods and won't be
 * disabled (assuming our entity is named 'things' and our relation is named 'relations'):
 *
 * <table>
 * <tr>
 *     <th>HTTP Method</th>
 *     <th>Url</th>
 * </tr>
 * <tr>
 *     <td>GET</td>
 *     <td>/things/{id}/relations</td>
 * </tr>
 * <tr>
 *     <td>HEAD</td>
 *     <td>/things/{id}/relations/rel/{fk}</td>
 * </tr>
 * <tr>
 *     <td>PUT</td>
 *     <td>/things/{id}/relations/rel/{fk}</td>
 * </tr>
 * <tr>
 *     <td>DELETE</td>
 *     <td>/things/{id}/relations/rel/{fk}</td>
 * </tr>
 *
 * @param entity the entity for which to configure the REST endpoint
 * @param relationName the name of hte relation
 */
restEndpointConfigurer.allowDefaultCrudMethodsOnlyForRelation = function (entity, relationName) {
  // entity.disableRemoteMethod('__get__' + relationName, false); // GET /things/{id}/relations

  // has many through specific methods
  // entity.disableRemoteMethod('__exists__' + relationName, false); // HEAD /things/{id}/relations/rel/{fk}
  // entity.disableRemoteMethod('__link__' + relationName, false); // PUT /things/{id}/relations/rel/{fk}
  // entity.disableRemoteMethod('__unlink__' + relationName, false); // DELETE /things/{id}/relations/rel/{fk}

  entity.disableRemoteMethod('__count__' + relationName, false); // GET /things/{id}/relations/count
  entity.disableRemoteMethod('__create__' + relationName, false); // POST /things/{id}/relations
  entity.disableRemoteMethod('__delete__' + relationName, false); // DELETE /things/{id}/relations
  entity.disableRemoteMethod('__destroyById__' + relationName, false); // DELETE /things/{id}/relations/{fk}
  entity.disableRemoteMethod('__findById__' + relationName, false); // GET /things/{id}/relations/{fk}
  entity.disableRemoteMethod('__updateById__' + relationName, false); // PUT /things/{id}/relations/{fk}

};

module.exports = restEndpointConfigurer;
