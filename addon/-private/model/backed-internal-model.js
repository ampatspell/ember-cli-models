import InternalModel from './internal-model';

export default class BackedInternalModel extends InternalModel {

  constructor(manager, modelName, props, storage) {
    super(manager, { modelName, props });
    this.storage = storage;
  }

  _createModel() {
    let { modelName, props } = this.opts;
    return this.__createModel(modelName, props);
  }

}
