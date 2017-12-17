import InternalFilter from './internal-filter';

export default class InternalFilterFirst extends InternalFilter {

  constructor(context, opts) {
    super(context, opts);
  }

  _createModel() {
    return this.context.filterFactory.createFirstModel(this);
  }

}