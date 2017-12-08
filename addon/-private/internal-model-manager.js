import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { typeOf } from '@ember/utils';
import Push from './model/push';

export default EmberObject.extend({

  _context: null,

  _onCreated(internal, notify) {
    internal.onCreated && internal.onCreated(notify);
    this._context.internalModelIdentity.registerCreated(internal);
  },

  _onDeleted(internal, notify) {
    internal.onDeleted && internal.onDeleted(notify);
    this._context.internalModelIdentity.registerDeleted(internal);
  },

  _internalModelWillDestroy(internal, unregister) {
    if(unregister) {
      this._context.internalModelIdentity.unregister(internal);
    }
  },

  _existingInternalModelForStorage(storage) {
    return this._context.internalModelIdentity.byStorage(storage);
  },

  _createNewInternalModel() {
    return this._context.internalModelFactory.createNewInternalModel(this._context, ...arguments);
  },

  _createExistingBackedInternalModel() {
    return this._context.internalModelFactory.createExistingBackedInternalModel(this._context, ...arguments);
  },

  // creates *existing* backed model if does not already exist
  pushStorage(storage) {
    let internal = this._existingInternalModelForStorage(storage);
    if(internal) {
      this._onCreated(internal, true);
      return new Push(internal, false);
    } else {
      internal = this._createExistingBackedInternalModel(storage);
      this._onCreated(internal, false);
      return new Push(internal, true);
    }
  },

  deleteStorage(storage) {
    let internal = this._context.internalModelIdentity.byStorage(storage);
    if(!internal) {
      return;
    }
    this._onDeleted(internal, true);
  },

  // creates *new* transient or backed model
  model() {
    let internal = this._createNewInternalModel(...arguments);
    this._onCreated(internal, false);
    return internal.model(true);
  },

  _pushStorageReturningModel(storage) {
    return this.pushStorage(storage).model;
  },

  find() {
    return this._context.adapter.find(...arguments).then(result => {
      if(typeOf(result) === 'array') {
        return A(result.map(storage => this._pushStorageReturningModel(storage)));
      }
      return this._pushStorageReturningModel(result);
    });
  },

  first() {
    return this._context.adapter.first(...arguments).then(storage => {
      return this._pushStorageReturningModel(storage);
    });
  }

});
