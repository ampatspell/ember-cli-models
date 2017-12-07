import EmberObject from '@ember/object';
import factoryFor from './util/factory-for';

export default EmberObject.extend({

  store: null,
  identifier: null,

  _internalModelManager: null,

  init() {
    this._super(...arguments);
    let _internalModelFactory = this.store._internalModelFactory;
    this._internalModelManager = factoryFor(this, 'models:internal-model-manager').create({ _internalModelFactory });
  },

  model(modelName, data) {
    return this._internalModelManager.model(modelName, data);
  },

  toStringExtension() {
    let store = this.get('store.identifier');
    let identifier = this.get('identifier');
    return `${store}/${identifier}`;
  }

});
