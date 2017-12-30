import InternalFilter from './internal-filter';
import ModelMixin from './internal/model-mixin';

export default class InternalFilterFind extends ModelMixin(InternalFilter) {

  _createModel() {
    return this.context.filterFactory.createFindModel(this);
  }

  content(create) {
    let filter = this.filter(create);
    return filter && filter.content;
  }

}
