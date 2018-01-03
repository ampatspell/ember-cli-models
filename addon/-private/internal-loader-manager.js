import EmberObject from '@ember/object';

export default EmberObject.extend({

  _context: null,

  internalLoader(opts) {
    return this._context.internalLoaderFactory.createInternalLoader(opts);
  }

});
