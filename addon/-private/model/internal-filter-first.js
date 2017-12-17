import InternalFilter from './internal-filter';

export default class InternalFilterFirst extends InternalFilter {

  update(content) {
    if(this._content === content) {
      return;
    }
    this._content = content;
    let model = this.model(false);
    if(model) {
      model.set('content', content);
    }
  }

  _createContent() {
    return this._rematch();
  }

  _createModel() {
    return this.context.filterFactory.createFirstModel(this);
  }

  _match(models) {
    return models.find(model => this._matches(model));
  }

  _rematch() {
    let source = this.opts.source.object;
    return this._match(source) || null;
  }

  _sourceArrayAdded(models) {
    let content = this.content(false);
    if(content) {
      return;
    }
    let model = this._match(models);
    if(!model) {
      return;
    }
    this.update(model);
  }

  _sourceArrayRemoved(models) {
    let content = this.content(false);
    if(!content) {
      return;
    }
    if(!models.includes(content)) {
      return;
    }
    let next = this._rematch();
    this.update(next);
  }

  _sourceArrayUpdated(model) {
    let content = this.content(false);
    if(content) {
      if(this._matches(content)) {
        return;
      }
      if(content === model) {
        this.update(this._rematch());
      } else {
        if(this._matches(model)) {
          this.update(model);
        }
      }
    } else {
      if(this._matches(model)) {
        this.update(model);
      }
    }
  }

  _ownerUpdated() {
    let model = this._rematch();
    this.update(model);
  }

}
