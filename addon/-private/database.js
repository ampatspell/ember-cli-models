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

  _createNewInternalModel(modelName) {
    let internal = this.store._internalModelFactory.createNewInternalModel(modelName, this);
    this._internalModelIdentity.registerNewInternalModel(internal);
    return internal;
  },

  _internalModelWillDestroy(internal) {
    this._internalModelIdentity.unregisterInternalModel(internal);
  },

  model(modelName) {
    return this._createNewInternalModel(modelName).model(true);
  },

  // push(storage) {
  // },

  toStringExtension() {
    let store = this.get('store.identifier');
    let identifier = this.get('identifier');
    return `${store}/${identifier}`;
  }

});
