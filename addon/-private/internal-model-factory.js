import EmberObject from '@ember/object';
import InternalModel from './internal-model';
import { isObject } from './util/assert';

const adapterForDatabase = database => database.store._adapter;

export default EmberObject.extend({

  _modelClassFactory: null,

  _modelClassForName(modelName) {
    return this._modelClassFactory.lookup(modelName);
  },

  _expandData(data, database) {
    let built = adapterForDatabase(database).build(data);
    isObject('adapter.build result', built);
    return built;
  },

  createNewInternalModel(modelName, database, data) {
    let { normalizedName, factory } = this._modelClassForName(modelName);
    let { storage, props } = this._expandData(data, database);
    return new InternalModel(database, normalizedName, factory, props, storage);
  }

});
