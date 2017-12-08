export default class InternalModel {

  constructor(manager, opts) {
    this.manager = manager;
    this.opts = opts;
    this._model = null;
  }

  __createModel() {
    return this.manager._modelFactory.createModel(this, ...arguments);
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
    this.manager._internalModelWillDestroy(this);
    this._model = null;
  }

}
