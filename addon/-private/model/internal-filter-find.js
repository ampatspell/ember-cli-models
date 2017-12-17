import InternalFilter from './internal-filter';

export default class InternalFilterFind extends InternalFilter {

  constructor(context, opts) {
    super(context, opts);
  }

  _createModel() {
    return this.context.filterFactory.createFindModel(this);
  }

}
