import EmberObject from '@ember/object';
import factoryFor from './util/factory-for';

export default EmberObject.extend({

  _internalModelFactory: null,
  _internalModelIdentity: null,

  init() {
    this._super(...arguments);
    this._internalModelIdentity = factoryFor(this, 'models:internal-model-identity').create();
  },

/*
  _expandData(data, manager) {
    let built = adapterForDatabase(database).build(data, database);
    isObject('adapter.build result', built);
    return built;
  },

*/

  _createNewInternalModel(modelName, data) {
    let internal = this._internalModelFactory.createNewInternalModel(modelName, this, data);
    this._internalModelIdentity.registerNewInternalModel(internal);
    return internal;
  },

  _internalModelWillDestroy(internal) {
    this._internalModelIdentity.unregisterInternalModel(internal);
  },

  model(modelName, data) {
    return this._createNewInternalModel(modelName, data).model(true);
  }

});
