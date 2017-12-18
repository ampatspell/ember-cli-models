import Internal from './internal';
import ArrayFilter from '../util/array-filter';

export default class InternalFilter extends Internal {

  constructor(context, opts) {
    super(context, opts);
    this._source = null;
    this._owner = null;
    this._filter = null;
  }

  _createFilter() {
    let { source: array, owner } = this.opts;
    return new ArrayFilter({
      array,
      owner,
      delegate: {
        target:   this,
        added:    this._filterDidAdd,
        removed:  this._filterDidRemove,
        replaced: this._filterDidReplace
      }
    });
  }

  _didCreateFilter() {
  }

  filter(create) {
    let filter = this._filter;
    if(!filter && create) {
      filter = this._createFilter();
      this._filter = filter;
      this._didCreateFilter();
    }
    return filter;
  }

  destroy() {
    let filter = this._filter;
    if(filter) {
      filter.destroy();
    }
    super.destroy();
  }

}
