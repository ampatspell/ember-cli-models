import EmberObject, { get } from '@ember/object';
import { assign } from '@ember/polyfills';
import { assert } from './util/assert';

export default EmberObject.extend({

  _context: null,

  createModel(_internal, expectedModelClass, modelName, props) {
    let { factory } = this._context.modelClassFactory.lookup(modelName);
    assert(`model '${modelName}' must be ${get(expectedModelClass.constructor, 'modelType')}`, expectedModelClass.detect(factory.class));
    return factory.create(assign({}, props, { _internal }));
  }

});
