import Internal from './internal';
import ModelMixin from './internal/model-mixin';
import ObjectObserver from '../util/object-observer';
import { resolve, reject } from 'rsvp';

const normalizeOptions = opts => {
  let { operation } = opts;
  operation.state = undefined;
  return opts;
};

export default class InternalLoader extends ModelMixin(Internal) {

  constructor(context, opts) {
    super(context, normalizeOptions(opts));
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

  // temporary
  _performOperation() {
    let opts = this.opts;
    let { object } = opts.owner;
    let { state, perform } = opts.operation;
    return resolve(perform(state, object)).then(result => {
      let { isMore, state } = result;
      console.log(isMore, state);
    }, err => {
      return reject(err);
    });
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
          updated: this._ownerPropertyDidChange
        }
      });
      this._observer = observer;
    }
    return observer;
  }

  _ownerPropertyDidChange(object, key) {
    // TODO: reset state
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
