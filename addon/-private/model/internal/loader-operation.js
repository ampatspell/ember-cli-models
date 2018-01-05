import { reject } from 'rsvp';
import Operation from '../../util/operation/operation';

class LoaderOperation extends Operation {

  constructor(loader, type, skip) {
    super();
    this.type = type;
    this.skip = skip;
    this.loader = loader;
  }

  _perform() {
    let opts = this.loader.opts;
    let { object } = opts.owner;
    let { state, perform } = opts.operation;
    return perform.call(object, state, object);
  }

  _withState(notify, cb) {
    this.loader._withState(notify, cb, this.skip);
  }

  onLoading(notify) {
    console.log('onLoading', this);
    this._withState(notify, (state, changed) => state.onLoading(changed));
  }

  onLoaded(result) {
    console.log('onLoaded', this);
    let isMore = false;
    this._withState(true, (state, changed) => state.onLoaded(changed, isMore));
  }

  onError(err) {
    console.log('onError', this);
    this._withState(true, (state, changed) => state.onError(changed, err));
  }

  perform() {
    this.onLoading();
    return this._perform().then(arg => {
      this.onLoaded(arg);
      return arg;
    }, err => {
      this.onError(err);
      return reject(err);
    });
  }

}

export class LoadOperation extends LoaderOperation {

  constructor(loader) {
    super(loader, 'load');
  }

}

export class LoadMoreOperation extends LoaderOperation {

  constructor(loader) {
    super(loader, 'load-more');
  }

}

export class ReloadOperation extends LoaderOperation {

  constructor(loader) {
    super(loader, 'reload');
  }

}

export class AutoloadOperation extends LoaderOperation {

  constructor(loader, skip) {
    super(loader, 'autoload', skip);
  }

}
