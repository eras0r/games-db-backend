'use strict';

var log = require('./../middleware/logger');

module.exports = function (app, callback) {

  log.info('--- boot script "10-insert-roles" started... ---- ');

  var Role = app.models.Role;

  app.dataSources.mongoDb.autoupdate('Role', function (err) {
    if (err) {
      throw err;
    }

    // check Roles
    Role.count(function (err, roleCount) {
      log.debug('Number of Roles: %d', roleCount);
      // we have no roles yet
      if (roleCount <= 0) {
        log.info('No Roles are present yet. Insert Role master data...');
        insertRoles();
      }
      else {
        log.info('Roles are already present. No need to insert Role master data.');
        endScript(callback);
      }
    });

  });

  /**
   * Inserts the roles master data.
   */
  function insertRoles() {
    Role.create([
      {name: 'ADMIN'},
      {name: 'GAMER'},
      {name: 'PAINTER'}
    ], function (err, roles) {
      if (err) {
        throw err;
      }

      log.info('Number of Roles created: %d', Object.keys(roles).length);
      endScript(callback);
    });
  }

  function endScript(callback) {
    log.info('--- boot script "10-insert-roles"  ended ---- ');
    // invoke async bootscript callback function
    callback();
  }

};
