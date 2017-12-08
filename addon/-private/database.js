import EmberObject from '@ember/object';
import { Context, makeContextMixin, adapter, identity } from './util/make-context-mixin';

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
  get identity() {
    return this._identity = this._identity ||  this.create('models:database-identity', {
      content: this.internalModelIdentity._identity.all
    });
  }
  start() {
    this.adapter.start();
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
  identity: identity(),

  model() {
    return this._context.internalModelManager.model(...arguments);
  },

  find() {
    return this._context.internalModelManager.find(...arguments);
  },

  first() {
    return this._context.internalModelManager.first(...arguments);
  },

  toStringExtension() {
    let store = this.get('store.identifier');
    let identifier = this.get('identifier');
    return `${store}/${identifier}`;
  }

});
