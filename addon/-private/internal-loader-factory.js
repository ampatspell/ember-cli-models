import EmberObject from '@ember/object';
import InternalLoader from './model/internal-loader';

export default EmberObject.extend({

  _context: null,

  createInternalLoader(opts) {
    return new InternalLoader(this._context, opts);
  }

});
