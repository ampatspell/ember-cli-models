export default class Push {

  constructor(internal, created) {
    this._internal = internal;
    this._created = created;
  }

  get created() {
    return this._created;
  }

  get modelName() {
    return this._internal.modelName(true);
  }

  get model() {
    return this._internal.model(true);
  }

}
