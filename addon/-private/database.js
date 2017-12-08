import EmberObject from '@ember/object';
import factoryFor from './util/factory-for';

export default EmberObject.extend({

  store: null,
  identifier: null,

  _internalModelFactory: null,
  _internalModelManager: null,

  _start() {
    this._internalModelFactory = factoryFor(this, 'models:internal-model-factory').create({
      _modelClassFactory: this.store._modelClassFactory,
      _adapter: this._adapter
    });
    this._internalModelManager = factoryFor(this, 'models:internal-model-manager').create({
      _internalModelFactory: this._internalModelFactory,
      _modelFactory: this.store._modelFactory,
      _adapter: this._adapter
    });
    this._adapter._start();
  },

  model() {
    return this._internalModelManager.model(...arguments);
  },

  toStringExtension() {
    let store = this.get('store.identifier');
    let identifier = this.get('identifier');
    return `${store}/${identifier}`;
  }

});
