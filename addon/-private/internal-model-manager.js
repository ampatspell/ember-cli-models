import EmberObject from '@ember/object';
import Push from './model/push';

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
  pushStorage(storage) {
    let internal = this._context.internalModelIdentity.byStorage(storage);
    if(internal) {
      return;
    }
    internal = this._createExistingBackedInternalModel(storage);
    return new Push(internal);
  },

  deleteStorage() {

  },

  // creates *new* transient or backed model
  model() {
    return this._createNewInternalModel(...arguments).model(true);
  }

});
