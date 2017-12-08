import EmberObject from '@ember/object';
import makeContextMixin from './util/make-context-mixin';
import factoryFor from './util/factory-for';

class DatabaseContext {
  constructor(owner) {
    this.owner = owner;
    this.parent = owner.store._context;
    let props = { _context: this };
    this.internalModelFactory = factoryFor(owner, 'models:internal-model-factory').create(props);
    this.internalModelManager = factoryFor(owner, 'models:internal-model-manager').create(props);
    this.modelClassFactory = this.parent.modelClassFactory;
    this.modelFactory = this.parent.modelFactory;
  }
  get adapter() {
    return this.owner._adapter;
  }
  destroy() {
  }
}

const DatabaseContextMixin = makeContextMixin(DatabaseContext);

export default EmberObject.extend(DatabaseContextMixin, {

  store: null,
  identifier: null,

  _start() {
    this._adapter._start();
  },

  model() {
    return this._context.internalModelManager.model(...arguments);
  },

  toStringExtension() {
    let store = this.get('store.identifier');
    let identifier = this.get('identifier');
    return `${store}/${identifier}`;
  }

});
