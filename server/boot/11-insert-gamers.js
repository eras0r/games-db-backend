'use strict';

var Q = require('q');
var _ = require('lodash');

var log = require('./../middleware/logger');
var gamers = require('../master-data/gamers.json');

module.exports = function (app, callback) {

  log.info('--- boot script "11-insert-gamers" started... ---- ');

  var Gamer = app.models.Gamer;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  app.dataSources.mongoDb.autoupdate(['Gamer', 'RoleMapping'], function (err) {
    if (err) {
      throw err;
    }

    // check Gamers (Users)
    Gamer.count(function (err, gamerCount) {
      log.debug('Number of Gamers: %d', gamerCount);
      // we have no paint colors yet
      if (gamerCount <= 0) {
        log.info('No Gamers are present yet. Insert Gamer master data...');
        insertGamers();
      }
      else {
        log.info('Gamers are already present. No need to insert Gamer master data.');
      }
    });

  });

  /**
   * Inserts the gamers master data.
   */
  function insertGamers() {
    loadRolesFromDb()
      .then(function (dbRoles) {
        // create gamers
        var gamerPromises = [];
        gamers.forEach(function (gamer) {
          gamerPromises.push(insertGamer(gamer.gamer, gamer.roles, dbRoles));
        });

        // wait until all gamers have been created
        Q.all(gamerPromises)
          .then(function (results) {
            log.info('Number of Gamers created: %d', gamers.length);
            endScript(callback);
          })
          .catch(function (error) {
            log.error('Error creating master data Gamers', error);
          });
      })
      .catch(function (error) {
        log.error('Unable to load roles from database: ', error);
      });
  }

  /**
   * Loads and returns all roles from the database.
   * @returns {*|promise} promise containing all roles stored within the database.
   */
  function loadRolesFromDb() {
    log.info('Loading roles from database');
    var deferred = Q.defer();

    Role.find(function (err, roles) {
      if (err) {
        log.error('error:', err);
        throw err;
      }

      log.debug('Roles loaded from database: %s', _.map(roles, 'name'));

      deferred.resolve(roles);
    });

    return deferred.promise;
  }

  /**
   * Inserts a single gamer within the databse
   * @returns {*|promise}
   */
  function insertGamer(gamer, roles, dbRoles) {
    log.info('Creating Gamer with username: "%s"', gamer.username);

    var gamerDeferred = Q.defer();

    Gamer.create(gamer, function (err, createdGamer) {
      if (err) {
        throw err;
      }

      // filter out the desired gamer roles from all available roles
      var gamerDbRoles = _.filter(dbRoles, function (dbRole) {
        return _.includes(roles, dbRole.name);
      });

      // create role mappings
      var rolePromises = [];
      gamerDbRoles.forEach(function (gamerRole) {
        rolePromises.push(insertRoleMapping(createdGamer, gamerRole));
      });

      // wait until all role mapping have been created
      Q.all(rolePromises)
        .then(function (results) {
          gamerDeferred.resolve(createdGamer);
          log.info('Gamer with id="%s" and username="%s" has been created.',
            createdGamer.id.toString(), createdGamer.username);
        })
        .catch(function (error) {
          log.error('Error adding user roles', error);
          gamerDeferred.reject(error);
        });
    });

    return gamerDeferred.promise;
  }

  /**
   * Creates a role mapping for the given gamer and role
   * @param gamer the gamer
   * @param role the role
   * @returns {*|promise} promise containing the created role mapping
   */
  function insertRoleMapping(gamer, role) {
    log.info('Creating role mapping for gamer="%s" and role="%s"', gamer.username, role.name);
    var roleDeferred = Q.defer();

    role.principals.create({
      principalType: RoleMapping.USER,
      principalId: gamer.id
    }, function (err, principal) {
      if (err) {
        throw err;
      }

      roleDeferred.resolve(principal);
    });

    return roleDeferred.promise;
  }

  function endScript(callback) {
    log.info('--- boot script "11-insert-gamers" ended ---- ');
    // invoke async bootscript callback function
    callback();
  }

};
