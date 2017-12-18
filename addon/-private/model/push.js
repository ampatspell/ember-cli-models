const info = (push, key) => {
  let info = push._internal.modelInfo(true);
  if(!info) {
    return;
  }
  return info[key];
};

export default class Push {

  constructor(internal) {
    this._internal = internal;
  }

  get modelName() {
    return info(this, 'modelName');
  }

  get modelType() {
    return info(this, 'modelType');
  }

  get model() {
    return this._internal.model(true);
  }

}
