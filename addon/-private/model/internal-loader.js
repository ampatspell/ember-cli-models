import Internal from './internal';
import ModelMixin from './internal/model-mixin';
import ObjectObserver from '../util/object-observer';
import LoaderState from './internal/loader-state';
import withPropertyChanges from './internal/with-property-changes';
import { defer } from 'rsvp';

const normalizeOptions = opts => {
  let { operation } = opts;
  operation.state = undefined;
  return opts;
};

class Queue {
  constructor(loader) {
    this.loader = loader;
    this.operations = [];
  }

  schedule(operation) {
    this.operations.push(operation);
    this._runNext();
  }

  _runNext() {
    // nonsense
    let op = this.operations.shift();
    if(!op) {
      return;
    }
    op.invoke();
  }

}

class Operation {

  constructor(loader) {
    this.loader = loader;
    this.deferred = defer();
  }

  _invoke() {
    let opts = this.loader.opts;
    let { object } = opts.owner;
    let { state, perform } = opts.operation;
    return perform(state, object);
  }

  invoke() {
    let promise = this._invoke();
    promise.then(() => {
      this.deferred.resolve();
    }, err => {
      this.deferred.reject(err);
    });
  }

  get promise() {
    return this.deferred.promise;
  }

}

export default class InternalLoader extends ModelMixin(Internal) {

  constructor(context, opts) {
    super(context, normalizeOptions(opts));
    this.state = new LoaderState(this);
    this.observer = this._createObserver();
    this.queue = new Queue(this);
    this._autoload = null;
  }

  _createObserver() {
    let { object, observe } = this.opts.owner;
    return new ObjectObserver({
      object,
      observe,
      delegate: {
        target: this,
        updated: this.reset
      }
    });
  }

  _createModel() {
    return this.context.loaderFactory.createLoaderModel(this);
  }

  _createAutoloadModel() {
    return this.context.loaderFactory.createAutoloadModel(this);
  }

  autoload(create) {
    let autoload = this._autoload;
    if(!autoload && create) {
      autoload = this._createAutoloadModel();
      this._autoload = autoload;
    }
    return autoload;
  }

  //

  // ignore/cancel pending loads, return state to initial values
  // called when owner props change
  reset() {
    console.log('reset');
  }

  // load if not yet loaded
  load() {
    let op = new Operation(this);
    this.queue.schedule(op);
    return op.promise;
  }

  // reloads ignoring isLoaded state
  reload() {
    console.log('reload');
  }

  // only for recurrent. if isMore=false, doesn't load anything
  loadMore() {
    console.log('loadMore');
  }

  // kicks off autoload if not already loading
  getStateProperty(key, autoload) {
    console.log('getStateProperty', { key, autoload });
    return this.state[key];
  }

  //

  // usage: this._withState(true, (state, changed) => state.onLoading(changed));
  _withState(notify, cb) {
    withPropertyChanges(this, notify, changed => {
      cb(this.state, changed);
    });
  }

  //

  destroy() {
    let observer = this._observer;
    if(observer) {
      observer.destroy();
      this._observer = null;
    }
    let autoload = this._autoload;
    if(autoload) {
      autoload.destroy();
    }
    super.destroy();
  }

}
