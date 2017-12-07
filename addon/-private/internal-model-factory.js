import EmberObject from '@ember/object';
import InternalModel from './model/internal-model';

export default EmberObject.extend({

  _modelClassFactory: null,

  _modelClassForName(modelName) {
    return this._modelClassFactory.lookup(modelName);
  },

  createNewInternalModel(manager, modelName) {
    let { normalizedName, factory } = this._modelClassForName(modelName);
    return new InternalModel(manager, normalizedName, factory);
  }

});
