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

  recreateModel() {
    let model = this._model;
    if(!model) {
      return;
    }

    this._model = null;
    model[__recreate] = true;

    model.destroy();
  }

  modelWillDestroyPermanently() {
  }

  modelWillDestroy(model) {
    let recreate = model[__recreate];

    if(!recreate) {
      this.modelWillDestroyPermanently();
    }

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
    let model = this._model;
    if(model) {
      model.destroy();
    }
  }

}
