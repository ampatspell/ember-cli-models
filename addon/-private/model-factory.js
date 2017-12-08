import EmberObject from '@ember/object';
import { assign } from '@ember/polyfills';

export default EmberObject.extend({

  _context: null,

  createModel(_internal, modelName, props) {
    let { factory } = this._context.modelClassFactory.lookup(modelName);
    return factory.create(assign({}, props, { _internal }));
  }

});
