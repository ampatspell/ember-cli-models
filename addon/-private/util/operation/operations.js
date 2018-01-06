import { A } from '@ember/array';
import Settle from './settle';

export default class Operations {

  constructor() {
    this.array = A();
  }

  register(operation) {
    this.array.pushObject(operation);
  }

  unregister(operation) {
    this.array.removeObject(operation);
  }

  settle() {
    let settle = new Settle(this.array);
    return settle.promise;
  }

}
