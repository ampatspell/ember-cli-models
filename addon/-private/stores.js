import EmberObject from '@ember/object';
import makeContextMixin from './util/make-context-mixin';
import { assign } from '@ember/polyfills';
import Registry from './util/registry';
import normalizeIdentifier from './util/normalize-identifier';
import { assert, isObject, isString } from './util/assert';
import { omit } from './util/object';
import factoryFor from './util/factory-for';

class StoresContext {
  constructor(owner) {
    this.owner = owner;
    this.stores = new Registry();
  }
  destroy() {
    this.stores.destroy();
  }
}

const ContextMixin = makeContextMixin(StoresContext);

export default EmberObject.extend(ContextMixin, {

  storeOptionsForIdentifier() {
    assert(`override storeOptionsForIdentifier`, false);
  },

  _storeOptionsForIdentifier(identifier) {
    let opts = this.storeOptionsForIdentifier(identifier);
    isObject(`options for '${identifier}' store`, opts);
    isString(`store adapter for '${identifier}'`, opts.adapter);
    return opts;
  },

  _createAdapterForOptions(store, opts) {
    let name = opts.adapter;
    let normalizedName = normalizeIdentifier(name);
    let factory = factoryFor(this, `models:adapter/${normalizedName}/store`);
    assert(`store adapter '${normalizedName}' is not registered`, !!factory);
    let props = assign({ identifier: normalizedName }, omit(opts, [ 'adapter' ]), { store });
    return factory.create(props);
  },

  _createAdapterForIdentifier(store, identifier) {
    let options = this._storeOptionsForIdentifier(identifier);
    return this._createAdapterForOptions(store, options);
  },

  store(identifier) {
    let normalizedIdentifier = normalizeIdentifier(identifier);
    let stores = this._context.stores;

    let store = stores.get(normalizedIdentifier);
    if(!store) {
      store = factoryFor(this, 'models:store').create({ stores: this, identifier: normalizedIdentifier });
      store._adapter = this._createAdapterForIdentifier(store, normalizedIdentifier);
      stores.set(normalizedIdentifier, store);
      store._start();
    }

    return store;
  }

});
