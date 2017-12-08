import EmberObject from '@ember/object';

export default EmberObject.extend({

  store: null,
  options: null,

  start() {
  },

  stop() {
  },

  willDestroy() {
    this.stop();
    this._super();
  }

});
