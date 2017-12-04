import EmberObject from '@ember/object';
import Registry from './util/registry';
import factoryFor from './util/factory-for';
import normalizeIdentifier from './util/normalize-identifier';

export default EmberObject.extend({

  stores: null,
  identifier: null,

  _databases: null,
  _classFactory: null,
  _modelClassFactory: null,
  _internalModelFactory: null,

  init() {
    this._super(...arguments);
    this._databases = new Registry();
    this._classFactory = factoryFor(this, 'models:class-factory').create();
    this._modelClassFactory = factoryFor(this, 'models:model-class-factory').create({
      _classFactory: this._classFactory
    });
    this._internalModelFactory = factoryFor(this, 'models:internal-model-factory').create({
      _modelClassFactory: this._modelClassFactory
    });
  },

  database(identifier) {
    let normalizedIdentifier = normalizeIdentifier(identifier);
    let databases = this._databases;

    let database = databases.get(normalizedIdentifier);
    if(!database) {
      database = factoryFor(this, 'models:database').create({ store: this, identifier: normalizedIdentifier });
      databases.set(normalizedIdentifier, database);
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
