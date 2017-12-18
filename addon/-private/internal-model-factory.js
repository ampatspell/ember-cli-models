import EmberObject from '@ember/object';
import BackedInternalModel from './model/backed-internal-model';
import TransientInternalModel from './model/transient-internal-model';

export default EmberObject.extend({

  createBackedInternalModel(context, storage, props) {
    return new BackedInternalModel(context, storage, props);
  },

  createTransientInternalModel(context, modelName, modelType, props) {
    return new TransientInternalModel(context, modelName, modelType, props);
  },

});
