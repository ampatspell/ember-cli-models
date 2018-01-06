import { resolve } from 'rsvp';
import { A } from '@ember/array';
import { settle } from '../promise';

export default class SequentialQueue {

  constructor(parent) {
    this.parent = parent;
    this.operations = A();
    this.operation = null;
    this._promise = resolve();
  }

  find(fn) {
    return this.operations.find(fn);
  }

  schedule(operation) {
    this.operations.insertAt(0, operation);
    this.parent.register(operation);
    this._promise = settle(this._promise).then(() => this._invoke(operation));
  }

  cancel() {
    this.operations.forEach(operation => operation.cancel());
  }

  includesPending() {
    return !!this.find(operation => !operation.cancelled);
  }

  _invoke(operation) {
    this.operation = operation;
    return settle(operation.invoke()).then(() => {
      this.operation = null;
      this.operations.removeObject(operation);
      this.parent.unregister(operation);
    });
  }

  settle() {
    return settle(this._promise).then(() => this);
  }

}
