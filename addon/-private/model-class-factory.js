import EmberObject from '@ember/object';
import Model from './model/model';
import { assert } from './util/assert';

export default EmberObject.extend({

  _context: null,

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
    return this._context.classFactory.lookup({
      prefix: 'model',
      name: modelName,
      prepare: (Model, normalizedModelName) => {
        assert(`model '${normalizedModelName}' must be ember-cli-models/model`, this.isModelClass(Model));
        let Extended = Model.extend();
        Extended.reopenClass({ modelName: normalizedModelName });
        return Extended;
      }
    })
  }

});
