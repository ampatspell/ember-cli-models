import EmberObject from '@ember/object';

export default EmberObject.extend({

  store: null,
  identifier: null,

  _modelFactoryForName(modelName) {
    return this.store._modelFactoryForName(modelName);
  },

  model(modelName, props) {
    let factory = this._modelFactoryForName(modelName);
    // adapter storage for props
    // register in identity
    return factory.create(props);
  },

  // push(storage) {
  // },

  toStringExtension() {
    let store = this.get('store.identifier');
    let identifier = this.get('identifier');
    return `${store}/${identifier}`;
  }

});
