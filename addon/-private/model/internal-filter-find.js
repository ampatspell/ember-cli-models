import { A } from '@ember/array';
import InternalFilter from './internal-filter';

export default class InternalFilterFind extends InternalFilter {

  _createModel() {
    return this.context.filterFactory.createFindModel(this);
  }

  //

  _createContent() {
    return A(this._rematch());
  }

  //

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

  _sourceArrayUpdated(model) {
    let content = this.content();
    if(this._matches(model)) {
      content.addObject(model);
    } else {
      content.removeObject(model);
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

}
