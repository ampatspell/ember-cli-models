import EmberObject from '@ember/object';
import Model from './model';
import { assert } from './util/assert';

export default EmberObject.extend({

  _delegate: null, // { classFactory }

  get _classFactory() {
    return this._delegate.classFactory;
  },

  isModelClass(arg) {
    let curr = arg;
    while(curr) {
      if(curr === Model) {
        return true;
      }
      curr = curr.superclass;
    }
    return false;
  },

  lookup(modelName) {
    return this._classFactory.lookup({
      prefix: 'model',
      name: modelName,
      prepare: (Model, normalizedModelName) => {
        assert(`model '${normalizedModelName}' must be sofa Model`, this.isModelClass(Model));
        let Extended = Model.extend();
        Extended.reopenClass({ modelName: normalizedModelName });
        return Extended;
      }
    })
  }

});
