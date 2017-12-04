import { assign } from '@ember/polyfills';

const buildModelHash = (name, factory, props) => ({ name, factory, props, instance: null });

export default class InternalModel {

  constructor(database, modelName, modelFactory, modelProps, storage) {
    this.database = database;
    this.storage = storage;
    this.store = database.store;
    this._model = buildModelHash(modelName, modelFactory, modelProps);
  }

  _createModel() {
    let { factory, props } = this._model;
    return factory.create(assign({}, props, { _internal: this }));
  }

  model(create) {
    let model = this._model.instance;
    if(!model && create) {
      model = this._createModel();
      this._model.instance = model;
    }
    return model;
  }

  modelWillDestroy() {
    this._model.instance = null;
    this.database._internalModelWillDestroy(this);
  }

}
