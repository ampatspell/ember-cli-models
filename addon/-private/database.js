import EmberObject from '@ember/object';
import Context, { makeContextMixin } from './util/make-context-mixin';

class DatabaseContext extends Context {
  constructor(owner) {
    super(owner, owner.store._context);

    this.adapter = null;

    this.internalModelFactory = this.create('models:internal-model-factory');
    this.internalModelManager = this.create('models:internal-model-manager');
    this.modelClassFactory = this.parent.modelClassFactory;
    this.modelFactory = this.parent.modelFactory;
  }
  destroy() {
  }
}

const DatabaseContextMixin = makeContextMixin(DatabaseContext);

export default EmberObject.extend(DatabaseContextMixin, {

  store: null,
  identifier: null,

  _start() {
    this._context.adapter._start();
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
