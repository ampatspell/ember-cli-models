import { resolve } from 'rsvp';
import { A } from '@ember/array';
import { settle } from '../promise';

export default class SequentialQueue {

  constructor() {
    this.operations = A();
    this.operation = null;
    this._promise = resolve();
  }

  find(fn) {
    return this.operations.find(fn);
  }

  schedule(operation) {
    this.operations.pushObject(operation);
    this._promise = settle(this._promise).then(() => this._invoke(operation));
  }

  _invoke(operation) {
    this.operation = operation;
    return settle(operation.invoke()).then(() => {
      this.operation = null;
      this.operations.removeObject(operation);
    });
  }

  settle() {
    return settle(this._promise).then(() => this);
  }

}
