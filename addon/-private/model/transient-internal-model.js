import InternalModel from './internal-model';
import TransientModel from './transient-model';

export default class TransientInternalModel extends InternalModel {

  constructor(context, modelName, modelType, props) {
    super(context, { modelName, modelType, props });
  }

  get modelType() {
    return this.opts.modelType;
  }

  _createModel() {
    let { modelName, props } = this.opts;
    return this.__createModel(TransientModel, modelName, props);
  }

}
