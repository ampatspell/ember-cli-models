import EmberObject from '@ember/object';
import { A } from '@ember/array';

export default EmberObject.extend({

  _identity: null,

  init() {
    this._super(...arguments);
    this._identity = {
      all: A(),
      storage: new Map()
    };
  },

  register(internal) {
    let identity = this._identity;
    identity.all.addObject(internal);
    let storage = internal.storage;
    if(storage) {
      identity.storage.set(storage, internal);
    }
  },

  unregister(internal) {
    let identity = this._identity;
    identity.all.removeObject(internal);
    let storage = internal.storage;
    if(storage) {
      identity.storage.delete(storage);
    }
  },

  byStorage(storage) {
    return this._identity.storage.get(storage);
  }

});
