import EmberObject from '@ember/object';

export default EmberObject.extend({

  store: null,

  start() {
  },

  _start() {
    this.start();
  }

});
