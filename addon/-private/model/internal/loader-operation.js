import { resolve, reject } from 'rsvp';
import Operation from '../../util/operation/operation';

class LoaderOperation extends Operation {

  constructor(loader, type) {
    super();
    this.type = type;
    this.loader = loader;
  }

  _perform() {
    let opts = this.loader.opts;
    let { object } = opts.owner;
    let { state, perform } = opts.operation;
    return resolve(perform.call(object, state, object));
  }

  _withState(notify, cb) {
    this.loader._withState(notify, cb);
  }

  onLoading(notify) {
    if(this.cancelled) {
      return;
    }

    this._withState(notify, (state, changed) => state.onLoading(changed));
  }

  onLoaded() {
    if(this.cancelled) {
      return;
    }

    // TODO: result -> isMore
    let isMore = false;
    this._withState(true, (state, changed) => state.onLoaded(changed, isMore));
  }

  onError(err) {
    if(this.cancelled) {
      return;
    }

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

  constructor(loader) {
    super(loader, 'autoload');
  }

}
