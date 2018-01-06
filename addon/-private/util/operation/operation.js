import { defer, resolve } from 'rsvp';

export default class Operation {

  constructor() {
    this.cancelled = false;
  }

  // perform() {
  // }

  invoke() {
    resolve(this.perform()).then(arg => this._deferred.resolve(arg), err => this._deferred.reject(err));
    return this.promise;
  }

  cancel() {
    this.cancelled = true;
  }

  get _deferred() {
    let deferred = this.__deferred;
    if(!deferred) {
      deferred = defer();
      this.__deferred = deferred;
    }
    return deferred;
  }

  get promise() {
    return this._deferred.promise;
  }

}
