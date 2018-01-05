import { defer } from 'rsvp';
import { next } from '../promise';

export default class Operation {

  // perform() {
  // }

  invoke() {
    next()
      .then(() => this.perform())
      .then(arg => this._deferred.resolve(arg), err => this._deferred.reject(err));
    return this.promise;
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
