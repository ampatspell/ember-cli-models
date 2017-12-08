import InternalModel from './internal-model';

export default class BackedInternalModel extends InternalModel {

  constructor(manager, modelName, props, storage) {
    super(manager, { modelName, props });
    this.storage = storage;
  }

  _createModel() {
    let props = this.opts.props;
    let modelName = this.opts.modelName; // temporary
    return this.__createModel(modelName, props);
  }

}
