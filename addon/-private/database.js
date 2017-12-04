import EmberObject from '@ember/object';

export default EmberObject.extend({

  store: null,
  identifier: null,

  _createNewInternalModel(modelName) {
    return this.store._internalModelFactory.createNewInternalModel(modelName, this);
  },

  model(modelName) {
    return this._createNewInternalModel(modelName).model(true);
  },

  // push(storage) {
  // },

  toStringExtension() {
    let store = this.get('store.identifier');
    let identifier = this.get('identifier');
    return `${store}/${identifier}`;
  }

});
