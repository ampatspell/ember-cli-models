import EmberObject, { get } from '@ember/object';
import { A } from '@ember/array';
import { typeOf } from '@ember/utils';
import Push from './model/push';

const normalizeData = data => typeof data === 'undefined' ? {} : data;

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

  //

  _existingInternalModelForStorage(storage) {
    return this._context.internalModelIdentity.byStorage(storage);
  },

  //

  _createBackedInternalModel(storage) {
    return this._context.internalModelFactory.createBackedInternalModel(this._context, storage);
  },

  _createTransientInternalModel(modelName, props) {
    return this._context.internalModelFactory.createTransientInternalModel(this._context, modelName, props);
  },

  _createInternalModel(modelName, data) {
    data = normalizeData(data);
    let context = this._context;
    let { normalizedName, factory } = context.modelClassFactory.lookup(modelName);
    let type = get(factory.class, 'modelType');
    let internal;
    if(type === 'backed') {
      let storage = context.adapter.build(normalizedName, data);
      internal = context.internalModelIdentity.byStorage(storage);
      if(!internal) {
        internal = this._createBackedInternalModel(storage);
        this._onCreated(internal, false);
      }
    } else {
      internal = this._createTransientInternalModel(normalizedName, data);
      this._onCreated(internal, false);
    }
    return internal;
  },

  _pushBackedInternalModel(storage) {
    let internal = this._existingInternalModelForStorage(storage);
    let pushed;
    if(internal) {
      this._onCreated(internal, true);
      pushed = false;
    } else {
      internal = this._createBackedInternalModel(storage);
      this._onCreated(internal, false);
      pushed = true;
    }
    return { internal, pushed };
  },

  _pushBackedModel(storage) {
    return this._pushBackedInternalModel(storage).internal.model(true);
  },

  push(storage) {
    let { internal } = this._pushBackedInternalModel(storage);
    return new Push(internal);
  },

  delete(storage) {
    let internal = this._context.internalModelIdentity.byStorage(storage);
    if(internal) {
      this._onDeleted(internal, true);
      return true;
    }
    return false;
  },

  model(modelName, data) {
    return this._createInternalModel(modelName, data).model(true);
  },

  find() {
    return this._context.adapter.find(...arguments).then(result => {
      if(typeOf(result) === 'array') {
        return A(result.map(storage => this._pushBackedModel(storage)));
      }
      return this._pushBackedModel(result);
    });
  },

  first() {
    return this._context.adapter.first(...arguments).then(storage => {
      return this._pushBackedModel(storage);
    });
  },

  compact() {
    let context = this._context;
    let adapter = context.adapter;
    context.internalModelIdentity.withDeletedInternalModels(internal => {
      let storage = internal.storage;
      if(!storage) {
        return;
      }
      if(!adapter.compact(storage)) {
        return;
      }
      internal.destroy();
    });
  }

});
