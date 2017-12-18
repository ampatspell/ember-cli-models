import InternalFilter from './internal-filter';

export default class InternalFilterFind extends InternalFilter {

  _createModel() {
    return this.context.filterFactory.createFindModel(this);
  }

  content(create) {
    let filter = this.filter(create);
    return filter && filter.content;
  }

}
