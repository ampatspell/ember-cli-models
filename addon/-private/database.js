import EmberObject from '@ember/object';
import { Context, makeContextMixin, adapter } from './util/make-context-mixin';

class DatabaseContext extends Context {
  constructor(owner) {
    super(owner, owner.store._context);

    this.adapter = null;

    this.internalModelFactory = this.create('models:internal-model-factory');
    this.internalModelManager = this.create('models:internal-model-manager');
    this.internalModelIdentity = this.create('models:internal-model-identity');
    this.modelClassFactory = this.parent.modelClassFactory;
    this.modelFactory = this.parent.modelFactory;
  }
  destroy() {
    this.adapter.destroy();
  }
}

const DatabaseContextMixin = makeContextMixin(DatabaseContext);

export default EmberObject.extend(DatabaseContextMixin, {

  store: null,
  identifier: null,

  adapter: adapter(),

  _start() {
    this._context.adapter.start();
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
