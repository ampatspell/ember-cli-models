export default class State {

  _update(hash, changed) {
    for(let key in hash) {
      let value = hash[key];
      if(this[key] !== value) {
        this[key] = value;
        changed(key);
      }
    }
  }

}
