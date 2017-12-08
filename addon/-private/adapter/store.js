import EmberObject from '@ember/object';

export default EmberObject.extend({

  store: null,
  options: null,

  start() {
  },

  _start() {
    this.start();
  }

});
