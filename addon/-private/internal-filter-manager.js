import EmberObject from '@ember/object';
import { hasIdentity } from './util/is-instance';

const normalizeOptions = opts => {
  if(opts && opts.source && hasIdentity(opts.source.object)) {
    opts.source.object = opts.source.object.get('identity');
  }
  return opts;
};

export default EmberObject.extend({

  _context: null,

  internalFind(opts) {
    return this._context.internalFilterFactory.createInternalFind(normalizeOptions(opts));
  },

  internalFirst(opts) {
    return this._context.internalFilterFactory.createInternalFirst(normalizeOptions(opts));
  }

});
