import InternalModel from './internal-model';
import TransientModel from './transient-model';

export default class TransientInternalModel extends InternalModel {

  constructor(context, modelName, props) {
    super(context, { modelName, props });
  }

  _createModel() {
    let { modelName, props } = this.opts;
    return this.__createModel(TransientModel, modelName, props);
  }

}
