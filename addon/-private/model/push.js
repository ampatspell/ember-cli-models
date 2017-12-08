export default class Push {
  constructor(internal) {
    this._internal = internal;
  }
  get modelName() {
    return this._internal.modelName(true);
  }
  model() {
    return this._internal.model(true);
  }
}
