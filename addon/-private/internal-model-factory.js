import EmberObject from '@ember/object';
import BackedModel from './model/backed-model';
import TransientModel from './model/transient-model';
import BackedInternalModel from './model/backed-internal-model';
import TransientInternalModel from './model/transient-internal-model';
import assert from './util/assert';

const _internalModelMapping = [
  { modelClass: BackedModel,    createNew: '_createNewBackedInternalModel' },
  { modelClass: TransientModel, createNew: '_createNewTransientInternalModel' },
];

const invoke = (owner, { find, name, args }) => {
  let info = _internalModelMapping.find(find);
  assert(`unsupported model type`, !!info);
  return owner[info[name]].call(owner, ...args);
};

export default EmberObject.extend({

  _adapter: null,
  _modelClassFactory: null,

  _modelClassForName(modelName) {
    return this._modelClassFactory.lookup(modelName);
  },

  _createStorage(data) {
    return this._adapter.createStorage(data);
  },

  _createNewBackedInternalModel(manager, modelName, data) {
    let { props, storage } = this._createStorage(data);
    return new BackedInternalModel(manager, modelName, props, storage);
  },

  _createNewTransientInternalModel(manager, modelName, props) {
    return new TransientInternalModel(manager, modelName, props);
  },

  createNewInternalModel(manager, modelName, data) {
    let { normalizedName, factory } = this._modelClassForName(modelName);
    return invoke(this, {
      find: info => info.modelClass.detect(factory.class),
      name: 'createNew',
      args: [ manager, normalizedName, data ]
    });
  }

});
