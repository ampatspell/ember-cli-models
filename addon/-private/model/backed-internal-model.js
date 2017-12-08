import InternalModel from './internal-model';
import BackedModel from './backed-model';
import StorageObserver from './internal/storage-observer';

export default class BackedInternalModel extends InternalModel {

  constructor(context, props, storage) {
    super(context, { props });
    this.storage = storage;
  }

  observer(create) {
    let observer = this._observer;
    if(!observer && create) {
      observer = new StorageObserver(this.context, this.storage, {
        modelNameDidChange: () => this.destroyModel(true)
      });
      this._observer = observer;
    }
    return observer;
  }

  _createModel() {
    let observer = this.observer(true);
    let modelName = observer.modelName;
    if(!modelName) {
      return;
    }
    let props = this.opts.props;
    return this.__createModel(BackedModel, modelName, props);
  }

  destroy() {
    this._observer && this._observer.destroy();
    super.destroy();
  }

}
