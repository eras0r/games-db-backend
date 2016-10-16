'use strict';

var Q = require('q');
var _ = require('lodash');

var log = require('./../middleware/logger');

module.exports = function (app, callback) {

  log.info('--- boot script "11-insert-gamers" started... ---- ');

  var Gamer = app.models.Gamer;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  // TODO change to autouodate
  app.dataSources.mongoDb.automigrate(['Gamer', 'RoleMapping'], function (err) {
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
   * Inserts the users master data.
   */
  function insertGamers() {

    // the gamers to be created
    var gamers = [
      {
        gamer: {
          username: 'eras0r',
          email: 'eras0r@game-db.org',
          password: 'game-db'
        },
        roles: ['ADMIN', 'GAMER', 'PAINTER']
      },
      {
        gamer: {
          username: 'shine',
          email: 'shine@game-db.org',
          password: 'game-db'
        },
        roles: ['GAMER', 'PAINTER']
      }
    ];

    // load all roles
    // Role.find({where: {name: {inq: gamer.roles}}}, function (err, roles) {
    Role.find({}, function (err, roles) {
      if (err) {
        log.error('error:', err);
        throw err;
      }
      log.info('db roles: ' + roles);
      var dbRoles = roles;

      // create gamers
      var gamerPromises = [];
      gamers.forEach(function (gamer) {
        // create and add a new promise
        var gamerDeferred = Q.defer();
        gamerPromises.push(gamerDeferred.promise);

        log.info('Creating Gamer with username: "%s"', gamer.gamer.username);

        log.debug('db role: %j', dbRoles);
        // filter out the desired gamer roles from all available roles
        var gamerDbRoles = _.filter(dbRoles, function (dbRole) {
          return _.includes(gamer.roles, dbRole.name);
        });

        log.debug('the following gamer will be added for user "%s": %j', gamer.gamer.username, gamerDbRoles);

        Gamer.create(gamer.gamer, function (err, createdGamer) {
          if (err) {
            throw err;
          }

          // create role mappings
          var rolePromises = [];
          gamerDbRoles.forEach(function (gamerRole) {
            // create and add a new promise
            var roleDeferred = Q.defer();
            rolePromises.push(roleDeferred.promise);

            gamerRole.principals.create({
              principalType: RoleMapping.USER,
              principalId: createdGamer.id
            }, function (err, principal) {
              if (err) {
                throw err;
              }

              roleDeferred.resolve(principal);
            });
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

    });
  }

  function endScript(callback) {
    log.info('--- boot script "11-insert-gamers" ended ---- ');
    // invoke async bootscript callback function
    callback();
  }

};
