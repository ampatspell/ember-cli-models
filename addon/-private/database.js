import EmberObject from '@ember/object';
import factoryFor from './util/factory-for';

export default EmberObject.extend({

  store: null,
  identifier: null,

  _internalModelIdentity: null,

  init() {
    this._super(...arguments);
    this._internalModelIdentity = factoryFor(this, 'models:internal-model-identity').create();
  },

  _createNewInternalModel(modelName, data) {
    let internal = this.store._internalModelFactory.createNewInternalModel(modelName, this, data);
    this._internalModelIdentity.registerNewInternalModel(internal);
    return internal;
  },

  _internalModelWillDestroy(internal) {
    this._internalModelIdentity.unregisterInternalModel(internal);
  },

  model(modelName, data) {
    return this._createNewInternalModel(modelName, data).model(true);
  },

  toStringExtension() {
    let store = this.get('store.identifier');
    let identifier = this.get('identifier');
    return `${store}/${identifier}`;
  }

});
