import InternalModel from './internal-model';

export default class TransientInternalModel extends InternalModel {

  constructor(context, modelName, props) {
    super(context, { modelName, props });
  }

  _createModel() {
    let { modelName, props } = this.opts;
    return this.__createModel(modelName, props);
  }

}
