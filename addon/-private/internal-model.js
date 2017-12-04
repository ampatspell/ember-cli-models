export default class InternalModel {

  constructor(database, modelName, modelFactory, storage) {
    this.database = database;
    this.modelName = modelName;
    this.modelFactory = modelFactory;
    this.storage = storage;
    this.store = database.store;
    this._model = null;
  }

  _createModel() {
    return this.modelFactory.create({ _internal: this });
  }

  model(create) {
    let model = this._model;
    if(!model && create) {
      model = this._createModel();
      this._model = model;
    }
    return model;
  }

  modelWillDestroy() {
    this._model = null;
    this.database._internalModelWillDestroy();
  }

}
