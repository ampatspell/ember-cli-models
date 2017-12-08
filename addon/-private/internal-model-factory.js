import EmberObject from '@ember/object';
import BackedModel from './model/backed-model';
import TransientModel from './model/transient-model';
import BackedInternalModel from './model/backed-internal-model';
import TransientInternalModel from './model/transient-internal-model';
import assert from './util/assert';

const normalizeData = data => typeof data === 'undefined' ? {} : data;

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

  _context: null,

  _modelClassForName(modelName) {
    return this._context.modelClassFactory.lookup(modelName);
  },

  _createStorage(modelName, data) {
    return this._context.adapter.createStorage(modelName, data);
  },

  _createBackedInternalModel(context, props, storage, definition) {
    return new BackedInternalModel(context, props, storage, definition);
  },

  _createNewTransientInternalModel(context, modelName, props) {
    return new TransientInternalModel(context, modelName, props);
  },

  _createNewBackedInternalModel(context, modelName, data) {
    let { props, storage } = this._createStorage(modelName, data);
    return this._createBackedInternalModel(context, props, storage);
  },

  createNewInternalModel(context, modelName, data) {
    data = normalizeData(data);
    let { normalizedName, factory } = this._modelClassForName(modelName);
    return invoke(this, {
      find: info => info.modelClass.detect(factory.class),
      name: 'createNew',
      args: [ context, normalizedName, data ]
    });
  },

  createExistingBackedInternalModel(context, storage, definition) {
    return this._createBackedInternalModel(context, null, storage, definition);
  }

});
