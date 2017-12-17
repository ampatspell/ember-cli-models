import EmberObject from '@ember/object';
import InternalFilterFirst from './model/internal-filter-first';
import InternalFilterFind from './model/internal-filter-find';

export default EmberObject.extend({

  _context: null,

  createInternalFind(opts) {
    return new InternalFilterFind(this._context, opts);
  },

  createInternalFirst(opts) {
    return new InternalFilterFirst(this._context, opts);
  }

});
