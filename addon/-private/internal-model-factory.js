import EmberObject from '@ember/object';
import InternalModel from './internal-model';

export default EmberObject.extend({

  _modelClassFactory: null,

  _modelClassForName(modelName) {
    return this._modelClassFactory.lookup(modelName);
  },

  createNewInternalModel(modelName, database) {
    let { normalizedName, factory } = this._modelClassForName(modelName);
    return new InternalModel(database, normalizedName, factory, null);
  }

});
