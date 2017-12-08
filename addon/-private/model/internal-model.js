export default class InternalModel {

  constructor(context, opts) {
    this.context = context;
    this.opts = opts;
    this._model = null;
  }

  __createModel() {
    return this.context.modelFactory.createModel(this, ...arguments);
  }

  model(create) {
    let model = this._model;
    if(!model && create) {
      model = this._createModel();
      this._model = model;
    }
    return model;
  }

  destroyModel() {
    let model = this._model;
    if(!model) {
      return;
    }
    this._model = null;
    model.destroy();
  }

  modelWillDestroy(model) {
    // this.context.internalModelManager._internalModelWillDestroy(this);
    if(this._model === model) {
      this._model = null;
    }
  }

}
