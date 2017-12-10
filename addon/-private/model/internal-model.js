const __recreate = '__models_recreate';

export default class InternalModel {

  constructor(context, opts) {
    this.context = context;
    this.opts = opts;
    this._model = null;
    this.isDestroyed = false;
  }

  get database() {
    return this.context.owner;
  }

  get store() {
    return this.database.store;
  }

  get stores() {
    return this.store.stores;
  }

  __createModel() {
    return this.context.modelFactory.createModel(this, ...arguments);
  }

  model(create) {
    if(this.isDestroyed) {
      return;
    }
    let model = this._model;
    if(!model && create) {
      model = this._createModel();
      this._model = model;
    }
    return model;
  }

  destroyModel(recreate) {
    let model = this._model;
    if(!model) {
      return;
    }
    this._model = null;
    model[__recreate] = recreate;
    model.destroy();
  }

  modelWillDestroy(model) {
    let recreate = model[__recreate];
    this.context.internalModelManager._internalModelWillDestroy(this, !recreate);

    model._internal = null;
    if(this._model === model) {
      this._model = null;
    }

    if(!recreate) {
      this.destroy();
    }
  }

  destroy() {
    if(this.isDestroyed) {
      return;
    }
    this.isDestroyed = true;
    this.destroyModel();
  }

}
