const buildModel = (name, factory) => ({ name, factory, instance: null });

export default class InternalModel {

  constructor(database, modelName, modelFactory, storage) {
    this.database = database;
    this.storage = storage;
    this.store = database.store;
    this._model = buildModel(modelName, modelFactory);
  }

  _createModel() {
    return this._model.factory.create({ _internal: this });
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
    this.database._internalModelWillDestroy();
  }

}
