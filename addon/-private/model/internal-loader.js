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
  }

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

  _ownerPropertyDidChange(object, key) {
    // TODO: reset state
  }

  _createModel() {
    return this.context.loaderFactory.createLoaderModel(this);
  }

  destroy() {
    let observer = this._observer;
    if(observer) {
      observer.destroy();
      this._observer = null;
    }
    super.destroy();
  }

}
