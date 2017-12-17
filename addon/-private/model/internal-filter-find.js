import { A } from '@ember/array';
import InternalFilter from './internal-filter';
import ArrayObserver from '../util/array-observer';
import ObjectObserver from '../util/object-observer';

export default class InternalFilterFind extends InternalFilter {

  constructor(context, opts) {
    super(context, opts);
    this._content = null;
    this._source = null;
    this._owner = null;
  }

  _createContent() {
    let content = A(this._rematch());
    this._startObservingSource();
    this._startObservingOwner();
    return content;
  }

  content(create) {
    let content = this._content;
    if(!content && create) {
      content = this._createContent();
      this._content = content;
    }
    return content;
  }

  _createModel() {
    return this.context.filterFactory.createFindModel(this);
  }

  //

  _matches(model) {
    let { source, owner } = this.opts;
    let object = owner.object;
    return source.matches(model, object);
  }

  _match(models) {
    return models.filter(model => this._matches(model));
  }

  _rematch() {
    return this._match(this.opts.source.object);
  }

  _sourceArrayAdded(models) {
    let matched = this._match(models);
    this.content().addObjects(matched);
  }

  _sourceArrayRemoved(models) {
    this.content().removeObjects(models);
  }

  _sourceArrayUpdated(object) {
    let content = this.content();
    if(this._matches(object)) {
      content.addObject(object);
    } else {
      content.removeObject(object);
    }
  }

  _startObservingSource() {
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

  _ownerUpdated() {
    let models = this._rematch();
    let remove = [];

    this.content().forEach(model => {
      if(!models.includes(model)) {
        remove.push(model);
      }
      models.removeObject(model);
    });

    let content = this.content();

    content.removeObjects(remove);
    content.pushObjects(models);
  }

  _startObservingOwner() {
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

  destroy() {
    this._stopObservingSource();
    this._stopObservingOwner();
    super.destroy();
  }

}
