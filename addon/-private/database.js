import EmberObject from '@ember/object';

export default EmberObject.extend({

  store: null,
  identifier: null,

  // model(modelName, props) {
  // },

  // push(storage) {
  // },

  toStringExtension() {
    let store = this.get('store.identifier');
    let identifier = this.get('identifier');
    return `${store}/${identifier}`;
  }

});
