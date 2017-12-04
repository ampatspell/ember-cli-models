import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import normalizeIdentifier from './util/normalize-identifier';
import { assert } from './util/assert';

export default EmberObject.extend({

  _classes: null,

  init() {
    this._super(...arguments);
    this._classes = Object.create(null);
  },

  _lookupFactory(name) {
    let classes = this._classes;
    let factory = classes[name];
    if(!factory) {
      factory = getOwner(this).factoryFor(name);
      if(factory) {
        classes[name] = factory;
      }
    }
    return factory;
  },

  _registerFactory(name, factory) {
    getOwner(this).register(name, factory);
  },

  lookup({ prefix, name, prepare }) {
    let normalizedName = normalizeIdentifier(name);
    let fullName = `${prefix}:${normalizedName}`;
    let registeredName = `models:${prefix}/${normalizedName}`;
    let factory = this._lookupFactory(registeredName);
    if(!factory) {
      let Base = this._lookupFactory(fullName);
      assert(`class for name '${fullName}' is not registered`, !!Base);
      let BaseClass = Base.class;
      if(prepare) {
        BaseClass = prepare(BaseClass, normalizedName);
      }
      this._registerFactory(registeredName, BaseClass);
      factory = this._lookupFactory(registeredName);
    }
    return { normalizedName, factory };
  }

});
