'use strict';

var log = require('./../middleware/logger');

var paintColors = require('../master-data/paint-color.json');

module.exports = function (app, callback) {

  log.info('--- boot script "20-insert-paint-colors" started... ---- ');

  var PaintColor = app.models.PaintColor;

  app.dataSources.mongoDb.autoupdate('PaintColor', function (err) {
    if (err) {
      throw err;
    }

    PaintColor.count(function (err, paintColorCount) {
      log.debug('Number of PaintColors: %d', paintColorCount);
      // we have no paint colors yet
      if (paintColorCount <= 0) {
        log.info('No PaintColors are present yet. Insert PaintColor master data...');
        // insert master data
        insertMasterData();
      }
      else {
        log.info('PaintColors are already present. No need to insert PaintColor master data.');
        endScript(callback);
      }
    });

  });

  /**
   * Inserts the paint color master data.
   */
  function insertMasterData() {
    PaintColor.create(paintColors, function (err, paintColors) {
      if (err) {
        throw err;
      }

      log.info('Number of PaintColors created: %d', Object.keys(paintColors).length);
      endScript(callback);
    });
  }

  function endScript(callback) {
    log.info('--- boot script "20-insert-paint-colors" ended... ---- ');
    // invoke async bootscript callback function
    callback();
  }

};
