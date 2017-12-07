export default class InternalModel {

  constructor(manager) {
    this.manager = manager;
    this._model = null;
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
