import InternalModel from './internal-model';

export default class TransientInternalModel extends InternalModel {

  constructor(manager, modelName, props) {
    super(manager, { modelName, props });
  }

  _createModel() {
    let { modelName, props } = this.opts;
    return this.__createModel(modelName, props);
  }

}
