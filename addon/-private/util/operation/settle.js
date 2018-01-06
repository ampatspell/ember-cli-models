import { allSettled, defer } from 'rsvp';
import { next, schedule } from '@ember/runloop';

export default class Settle {

  constructor(operations) {
    this._operations = operations;
  }

  _afterRender(deferred) {
    let operations = this._operations;

    if(operations.length === 0) {
      deferred.resolve();
      return;
    }

    allSettled(operations.map(operation => operation.promise)).then(() => this._iteration(deferred));
  }

  _iteration(deferred) {
    schedule('afterRender', () => this._afterRender(deferred));
  }

  _next(deferred) {
    next(() => this._iteration(deferred));
  }

  _settle() {
    let deferred = defer();
    this._next(deferred);
    return deferred;
  }

  get promise() {
    let deferred = this._deferred;
    if(!deferred) {
      deferred = this._settle();
      this._deferred = deferred;
    }
    return deferred.promise;
  }

}
