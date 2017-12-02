import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import Registry from './util/registry';
import normalizeIdentifier from './util/normalize-identifier';

export default EmberObject.extend({

  _stores: null,

  init() {
    this._super(...arguments);
    this._stores = new Registry();
  },

  _factoryFor(name) {
    return getOwner(this).factoryFor(name);
  },

  store(identifier) {
    let normalizedIdentifier = normalizeIdentifier(identifier);
    let stores = this._stores;

    let store = stores.get(normalizedIdentifier);
    if(!store) {
      store = this._factoryFor('models:store').create({ stores: this, identifier: normalizedIdentifier });
      stores.set(normalizedIdentifier, store);
    }

    return store;
  },

  willDestroy() {
    this._super();
    this._stores.destroy();
  }

});
