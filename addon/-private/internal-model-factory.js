import EmberObject, { get } from '@ember/object';
import InternalModel from './internal-model';

export default EmberObject.extend({

  _modelClassFactory: null,

  _modelClassForName(modelName) {
    return this._modelClassFactory.lookup(modelName);
  },

  createNewInternalModel(modelName, database) {
    let factory = this._modelClassForName(modelName);
    let normalizedModelName = get(factory.class, 'modelName');
    return new InternalModel(database, normalizedModelName, factory, null);
  }

});
