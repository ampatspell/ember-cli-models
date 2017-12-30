import InternalFilter from './internal-filter';

export default class InternalFilterFirst extends InternalFilter {

  constructor() {
    super(...arguments);
    this._content = null;
  }

  // TODO: remove model
  _createModel() {
    throw new Error(`filter-first does not have a model`);
  }

  _didCreateFilter() {
    this._rematch(false);
  }

  _notifyOwnerPropertyChange() {
    let { object, key } = this.opts.owner;
    object.notifyPropertyChange(key);
  }

  content(create) {
    this.filter(create);
    return this._content;
  }

  _update(array, notify=true) {
    let content = array[0];

    if(this._content === content) {
      return;
    }

    this._content = content;

    if(notify) {
      this._notifyOwnerPropertyChange();
    }
  }

  _rematch(notify=true) {
    this._update(this.filter().content, notify);
  }

  _filterDidAdd(models) {
    let content = this._content;
    if(!content) {
      this._update(models);
    }
  }

  _filterDidRemove(models) {
    let content = this._content;
    if(models.includes(content)) {
      this._rematch();
    }
  }

  _filterDidReplace(removed, added) {
    let content = this._content;
    if(removed.includes(content)) {
      this._rematch();
    } else if(!content) {
      this._update(added);
    }
  }


}
