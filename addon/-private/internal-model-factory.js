import EmberObject from '@ember/object';
import InternalModel from './internal-model';

const adapterForDatabase = database => database.store._adapter;

export default EmberObject.extend({

  _modelClassFactory: null,

  _modelClassForName(modelName) {
    return this._modelClassFactory.lookup(modelName);
  },

  createNewInternalModel(modelName, database, data) {
    let { normalizedName, factory } = this._modelClassForName(modelName);
    let { storage, props } = adapterForDatabase(database).build(data);
    return new InternalModel(database, normalizedName, factory, props, storage);
  }

});
