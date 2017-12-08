import EmberObject from '@ember/object';
import factoryFor from './util/factory-for';

export default EmberObject.extend({

  _context: null,

  _registerInternalModel(internal) {
    this._context.internalModelIdentity.register(internal);
  },

  _internalModelWillDestroy(internal) {
    this._context.internalModelIdentity.unregister(internal);
  },

  _existingInternalModelForStorage(storage) {
    this._context.internalModelIdentity.existingByStorage(storage);
  },

  _createNewInternalModel() {
    let internal = this._context.internalModelFactory.createNewInternalModel(this._context, ...arguments);
    this._registerInternalModel(internal);
    return internal;
  },

  _createExistingBackedInternalModel() {
    let internal = this._context.internalModelFactory.createExistingBackedInternalModel(this._context, ...arguments);
    this._registerInternalModel(internal);
    return internal;
  },

  // creates *existing* backed model if does not already exist
  pushStorage(storage, definition) {
    let internal = this._context.internalModelIdentity.byStorage(storage);
    if(internal) {
      return;
    }
    internal = this._createExistingBackedInternalModel(storage, definition);
    return internal.model(true);
  },

  deleteStorage() {

  },

  // creates *new* transient or backed model
  model() {
    return this._createNewInternalModel(...arguments).model(true);
  }

});
