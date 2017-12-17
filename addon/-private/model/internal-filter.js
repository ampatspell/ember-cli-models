import Internal from './internal';
import ArrayObserver from '../util/array-observer';
import ObjectObserver from '../util/object-observer';

export default class InternalFilter extends Internal {

  constructor(context, opts) {
    super(context, opts);
    this._source = null;
    this._owner = null;
    this._content = null;
  }

  content(create) {
    let content = this._content;
    if(!content && create) {
      content = this._createContent();
      this._startObserving();
      this._content = content;
    }
    return content;
  }

  _matches(model) {
    if(model.isDestroying) {
      return false;
    }
    let { source, owner } = this.opts;
    let object = owner.object;
    return source.matches(model, object);
  }

  //

  _startObservingSource() {
    if(this._source) {
      return;
    }

    let { object: array, observe } = this.opts.source;

    this._source = new ArrayObserver({
      array,
      observe,
      delegate: {
        target:  this,
        added:   this._sourceArrayAdded,
        removed: this._sourceArrayRemoved,
        updated: this._sourceArrayUpdated
      }
    });
  }

  _stopObservingSource() {
    let source = this._source;
    if(source) {
      source.destroy();
      this._source = null;
    }
  }

  //

  _startObservingOwner() {
    if(this._object) {
      return;
    }

    let { object, observe } = this.opts.owner;

    this._owner = new ObjectObserver({
      object,
      observe,
      delegate: {
        target: this,
        updated: this._ownerUpdated
      }
    });
  }

  _stopObservingOwner() {
    let owner = this._owner;
    if(owner) {
      owner.destroy();
      this._owner = null;
    }
  }

  //

  _startObserving() {
    this._startObservingSource();
    this._startObservingOwner();
  }

  _stopObserving() {
    this._stopObservingSource();
    this._stopObservingOwner();
  }

  destroy() {
    this._stopObserving();
    super.destroy();
  }

}
