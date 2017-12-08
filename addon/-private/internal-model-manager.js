import EmberObject from '@ember/object';
import factoryFor from './util/factory-for';

export default EmberObject.extend({

  _adapter: null,
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

  _createExistingBackedInternalModel() {
    let internal = this._internalModelFactory.createExistingBackedInternalModel(this, ...arguments);
    this._registerExistingInternalModel(internal);
    return internal;
  },

  // creates or updates existing backed model
  // pushStorage(storage) {
  //   let internal = null; // lookup
  //   if(!internal) {
  //     internal = this._createExistingBackedInternalModel(storage);
  //   }
  //   return internal;
  // },

  // creates *new* transient or backed model
  model() {
    return this._createNewInternalModel(...arguments).model(true);
  }

});
