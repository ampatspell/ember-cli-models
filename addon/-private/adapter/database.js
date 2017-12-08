import EmberObject from '@ember/object';

export default EmberObject.extend({

  store: null,
  adapter: null,
  database: null,

  start() {
  },

  stop() {
  },

  push(storage, definition) {
    return this.database._context.internalModelManager.pushStorage(storage, definition);
  },

  delete(storage) {
    return this.database._context.internalModelManager.deleteStorage(storage);
  },

  willDestroy() {
    this.stop();
    this._super();
  }

});
