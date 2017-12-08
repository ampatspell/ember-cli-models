import EmberObject from '@ember/object';
import Registry from './util/registry';
import factoryFor from './util/factory-for';
import normalizeIdentifier from './util/normalize-identifier';
import { assert } from './util/assert';

export default EmberObject.extend({

  stores: null,
  identifier: null,
  _adapter: null,

  _databases: null,
  _classFactory: null,
  _modelClassFactory: null,
  _modelFactory: null,

  init() {
    this._super(...arguments);
    this._databases = new Registry();
    this._classFactory = factoryFor(this, 'models:class-factory').create();
    this._modelClassFactory = factoryFor(this, 'models:model-class-factory').create({
      _classFactory: this._classFactory
    });
    this._modelFactory = factoryFor(this, 'models:model-factory').create({
      _modelClassFactory: this._modelClassFactory
    });
  },

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
    let databases = this._databases;

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
  },

  willDestroy() {
    this._super();
    this._databases.destroy();
  }

});
