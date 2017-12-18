const __recreate = '__models_recreate';

export default class Internal {

  constructor(context, opts) {
    this.context = context;
    this.opts = opts;
    this._model = null;
    this.isDestroyed = false;
  }

  model(create) {
    let model = this._model;
    if(!model && create) {
      if(this.isDestroyed) {
        return;
      }
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

  modelWillDestroyWithRecreate() {
  }

  modelWillDestroy(model) {
    let recreate = model[__recreate];
    this.modelWillDestroyWithRecreate(recreate);

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
