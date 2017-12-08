import EmberObject from '@ember/object';
import { assign } from '@ember/polyfills';

export default EmberObject.extend({

  _modelClassFactory: null,

  createModel(_internal, modelName, props) {
    let { factory } = this._modelClassFactory.lookup(modelName);
    return factory.create(assign({}, props, { _internal }));
  }

});
