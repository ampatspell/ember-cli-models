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
    console.log('onLoading');
    this._withState(notify, (state, changed) => state.onLoading(changed));
  }

  onLoaded(isMore) {
    console.log('onLoaded');
    this._withState(true, (state, changed) => state.onLoaded(changed, isMore));
  }

  onError(err) {
    console.log('onError');
    this._withState(true, (state, changed) => state.onError(changed, err));
  }

}

export class LoadOperation extends LoaderOperation {

  constructor(loader) {
    super(loader, 'load');
  }

  perform() {
    console.log('load');
    this.onLoading();
    return this._perform().then(arg => {
      this.onLoaded(false);
      return arg;
    }, err => {
      this.onError(err);
      return reject(err);
    });
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
