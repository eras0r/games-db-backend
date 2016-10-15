'use strict';

module.exports = function (Paintcolor) {

  Paintcolor.disableRemoteMethod("upsert", true);
  Paintcolor.disableRemoteMethod("updateAll", true);
  Paintcolor.disableRemoteMethod("findOne", true);
  Paintcolor.disableRemoteMethod("replaceById", true);
  Paintcolor.disableRemoteMethod("replaceOrCreate", true);
  Paintcolor.disableRemoteMethod("createChangeStream", true);
  Paintcolor.disableRemoteMethod("upsertWithWhere", true);
  Paintcolor.disableRemoteMethod("confirm", true);
  Paintcolor.disableRemoteMethod("count", true);
  Paintcolor.disableRemoteMethod("exists", true);

};
