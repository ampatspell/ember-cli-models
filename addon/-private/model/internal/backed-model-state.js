export default class BackedModelState {

  constructor() {
    this.isDeleted = false;
  }

  _update(hash, changed) {
    for(let key in hash) {
      let value = hash[key];
      if(this[key] !== value) {
        this[key] = value;
        changed(key);
      }
    }
  }

  onCreated(changed) {
    this._update({ isDeleted: false }, changed);
  }

  onDeleted(changed) {
    this._update({ isDeleted: true }, changed);
  }

}
