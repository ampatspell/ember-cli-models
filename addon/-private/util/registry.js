import { A } from '@ember/array';
import { copy } from '@ember/object/internals';

export default class Registry {
  constructor() {
    this.keyed = Object.create(null);
    this.all = A();
  }
  get(key) {
    return this.keyed[key];
  }
  set(key, value) {
    this.keyed[key] = value;
    this.all.pushObject(value);
    return value;
  }
  remove(key) {
    let value = this.keyed[key];
    delete this.keyed[key];
    this.all.removeObject(value);
  }
  destroy() {
    copy(this.all).forEach(object => object.destroy());
  }
}
