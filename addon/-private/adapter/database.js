import EmberObject from '@ember/object';

export default EmberObject.extend({

  store: null,
  adapter: null,
  database: null,

  start() {
  },

  _start() {
    this.start();
  }

});
