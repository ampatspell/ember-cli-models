import EmberObject from '@ember/object';
import makeContextMixin from './util/make-context-mixin';
import Registry from './util/registry';
import factoryFor from './util/factory-for';
import normalizeIdentifier from './util/normalize-identifier';
import { assert } from './util/assert';

class StoreContext {
  constructor(owner) {
    this.owner = owner;
    this.parent = owner.stores._context;
    this.databases = new Registry();
    let props = { _context: this };
    this.classFactory = factoryFor(owner, 'models:class-factory').create(props);
    this.modelClassFactory = factoryFor(owner, 'models:model-class-factory').create(props);
    this.modelFactory = factoryFor(owner, 'models:model-factory').create(props);
  }
  destroy() {
    this.databases.destroy();
  }
}

const StoreContextMixin = makeContextMixin(StoreContext);

export default EmberObject.extend(StoreContextMixin, {

  stores: null,
  identifier: null,
  _adapter: null,

  _start() {
    this._adapter._start();
  },

  _createDatabaseAdapter(database) {
    let identifier = this._adapter.identifier;
    let factory = factoryFor(this, `models:adapter/${identifier}/database`);
    assert(`database adapter '${identifier}' not registered`, !!factory);
    return factory.create({ store: this, adapter: this._adapter, database });
  },

  database(identifier) {
    let normalizedIdentifier = normalizeIdentifier(identifier);
    let databases = this._context.databases;

    let database = databases.get(normalizedIdentifier);
    if(!database) {
      database = factoryFor(this, 'models:database').create({ store: this, identifier: normalizedIdentifier });
      database._adapter = this._createDatabaseAdapter(database);
      databases.set(normalizedIdentifier, database);
      database._start();
    }

    return database;
  },

  toStringExtension() {
    return this.get('identifier');
  }

});
