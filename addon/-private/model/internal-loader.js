import Internal from './internal';
import ModelMixin from './internal/model-mixin';
import ObjectObserver from '../util/object-observer';
import LoaderState from './internal/loader-state';
import withPropertyChanges from './internal/with-property-changes';
import SequentialQueue from '../util/operation/sequential-queue';
import {
  LoadOperation,
  LoadMoreOperation,
  ReloadOperation,
  AutoloadOperation
} from './internal/loader-operation';

const normalizeOptions = opts => {
  let { operation } = opts;
  operation.state = undefined;
  return opts;
};

export default class InternalLoader extends ModelMixin(Internal) {

  constructor(context, opts) {
    super(context, normalizeOptions(opts));
    this.state = new LoaderState(this);
    this.queue = new SequentialQueue();
    this.observer = this._createObserver();
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

  _schedule(operation) {
    this.queue.schedule(operation);
    return operation.promise;
  }

  // ignore/cancel pending loads, return state to initial values
  // called when owner props change
  reset() {
    console.log('reset');
  }

  // load if not yet loaded
  load() {
    let operation = new LoadOperation(this);
    return this._schedule(operation);
  }

  // reloads ignoring isLoaded state
  reload() {
    let operation = new ReloadOperation(this);
    return this._schedule(operation);
  }

  // only for recurrent. if isMore=false, doesn't load anything
  loadMore() {
    let operation = new LoadMoreOperation(this);
    return this._schedule(operation);
  }

  autoloadForKey(key) {
    let { isLoading, isLoaded } = this.state;

    if(isLoading || isLoaded) {
      return;
    }

    if(this.queue.operations.length > 0) {
      return;
    }

    let operation = new AutoloadOperation(this, [ key ]);
    this._schedule(operation);
  }

  // kicks off autoload if not already loading
  getStateProperty(key, autoload) {
    if(autoload) {
      this.autoloadForKey(key);
    }
    return this.state[key];
  }

  //

  _withState(notify, cb, skip) {
    withPropertyChanges(this, notify, changed => {
      cb(this.state, changed);
      if(changed.count) {
        changed('state');
      }
    }, skip);
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
