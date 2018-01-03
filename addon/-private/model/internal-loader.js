import Internal from './internal';
import ModelMixin from './internal/model-mixin';
import ObjectObserver from '../util/object-observer';
import LoaderState from './internal/loader-state';

const normalizeOptions = opts => {
  let { operation } = opts;
  operation.state = undefined;
  return opts;
};

// _performOperation() {
//   let opts = this.opts;
//   let { object } = opts.owner;
//   let { state, perform } = opts.operation;
//   return resolve(perform(state, object)).then(result => {
//     let { isMore, state } = result;
//     console.log(isMore, state);
//   }, err => {
//     return reject(err);
//   });
// }

export default class InternalLoader extends ModelMixin(Internal) {

  constructor(context, opts) {
    super(context, normalizeOptions(opts));
    this.state = new LoaderState(this);
    this._observer = null;
    this._autoload = null;
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
    console.log('load');
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

  observer(create) {
    let observer = this._observer;
    if(!observer && create) {
      let { object, observe } = this.opts.owner;
      observer = new ObjectObserver({
        object,
        observe,
        delegate: {
          target: this,
          updated: this.reset
        }
      });
      this._observer = observer;
    }
    return observer;
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
