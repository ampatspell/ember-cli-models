import EmberObject from '@ember/object';

export default EmberObject.extend({

  store: null,
  adapter: null,
  database: null,

  start() {
  },

  stop() {
  },

  push(storage) {
    return this.database._context.internalModelManager.pushStorage(storage);
  },

  delete(storage) {
    return this.database._context.internalModelManager.deleteStorage(storage);
  },

  willDestroy() {
    this.stop();
    this._super();
  }

});
