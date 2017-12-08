import EmberObject from '@ember/object';
import Context, { makeContextMixin } from './util/make-context-mixin';
import Registry from './util/registry';
import factoryFor from './util/factory-for';
import normalizeIdentifier from './util/normalize-identifier';
import { assert } from './util/assert';

class StoreContext extends Context {
  constructor(owner) {
    super(owner, owner.stores._context);

    this.adapter = null;
    this.databases = new Registry();

    this.classFactory = this.create('models:class-factory');
    this.modelClassFactory = this.create('models:model-class-factory');
    this.modelFactory = this.create('models:model-factory')
  }
  destroy() {
    this.databases.destroy();
  }
}

const StoreContextMixin = makeContextMixin(StoreContext);

export default EmberObject.extend(StoreContextMixin, {

  stores: null,
  identifier: null,

  _start() {
    this._context.adapter._start();
  },

  _createDatabaseAdapter(database) {
    let adapter = this._context.adapter;
    let identifier = adapter.identifier;
    let factory = factoryFor(this, `models:adapter/${identifier}/database`);
    assert(`database adapter '${identifier}' not registered`, !!factory);
    return factory.create({ store: this, adapter, database });
  },

  database(identifier) {
    let normalizedIdentifier = normalizeIdentifier(identifier);
    let databases = this._context.databases;

    let database = databases.get(normalizedIdentifier);
    if(!database) {
      database = factoryFor(this, 'models:database').create({ store: this, identifier: normalizedIdentifier });
      database._context.adapter = this._createDatabaseAdapter(database);
      databases.set(normalizedIdentifier, database);
      database._start();
    }

    return database;
  },

  toStringExtension() {
    return this.get('identifier');
  }

});
