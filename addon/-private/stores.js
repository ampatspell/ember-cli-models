import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import Registry from './util/registry';
import normalizeIdentifier from './util/normalize-identifier';
import { assert, isObject, isString } from './util/assert';
import { omit } from './util/object';

export default EmberObject.extend({

  _stores: null,

  init() {
    this._super(...arguments);
    this._stores = new Registry();
  },

  _factoryFor(name) {
    return getOwner(this).factoryFor(name);
  },

  storeOptionsForIdentifier() {
    assert(`override storeOptionsForIdentifier`, false);
  },

  _storeOptionsForIdentifier(identifier) {
    let opts = this.storeOptionsForIdentifier(identifier);
    isObject(`options for '${identifier}' store`, opts);
    isString(`store adapter for '${identifier}'`, opts.adapter);
    return opts;
  },

  _createAdapterForOptions(opts) {
    let name = opts.adapter;
    let normalizedName = normalizeIdentifier(name);
    let factory = this._factoryFor(`models:adapter/${normalizedName}`);
    assert(`adapter '${normalizedName}' is not registered`, !!factory);
    let props = omit(opts, [ 'adapter' ]);
    return factory.create(props);
  },

  store(identifier) {
    let normalizedIdentifier = normalizeIdentifier(identifier);
    let stores = this._stores;

    let store = stores.get(normalizedIdentifier);
    if(!store) {
      let options = this._storeOptionsForIdentifier(normalizedIdentifier);
      let adapter = this._createAdapterForOptions(options);

      store = this._factoryFor('models:store').create({
        stores:     this,
        identifier: normalizedIdentifier,
        _adapter:   adapter
      });

      adapter.store = store;

      stores.set(normalizedIdentifier, store);
    }

    return store;
  },

  willDestroy() {
    this._super();
    this._stores.destroy();
  }

});
