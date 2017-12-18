import InternalFilter from './internal-filter';

export default class InternalFilterFirst extends InternalFilter {

  constructor() {
    super(...arguments);
    this._content = null;
  }

  _createModel() {
    return this.context.filterFactory.createFirstModel(this);
  }

  _didCreateFilter() {
    this._rematch();
  }

  content(create) {
    this.filter(create);
    return this._content;
  }

  _update(array) {
    let content = array[0];

    if(this._content === content) {
      return;
    }

    this._content = content;

    let model = this.model(false);
    if(model) {
      model.set('content', content);
    }
  }

  _rematch() {
    this._update(this.filter().content);
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
