import EmberObject from '@ember/object';
import factoryFor from './util/factory-for';

export default EmberObject.extend({

  _modelFactory: null,
  _internalModelFactory: null,
  _internalModelIdentity: null,

  init() {
    this._super(...arguments);
    this._internalModelIdentity = factoryFor(this, 'models:internal-model-identity').create();
  },

  _registerNewInternalModel(internal) {
    this._internalModelIdentity.registerNewInternalModel(internal);
  },

  _internalModelWillDestroy(internal) {
    this._internalModelIdentity.unregisterInternalModel(internal);
  },

  _createNewInternalModel() {
    let internal = this._internalModelFactory.createNewInternalModel(this, ...arguments);
    this._registerNewInternalModel(internal);
    return internal;
  },

  model() {
    return this._createNewInternalModel(...arguments).model(true);
  }

});
