import InternalModel from './internal-model';
import StorageObserver from './internal/storage-observer';

export default class BackedInternalModel extends InternalModel {

  constructor(context, props, storage, definition) {
    super(context, { props, definition });
    this.storage = storage;
  }

  observer(create) {
    let observer = this._observer;
    if(!observer && create) {
      observer = new StorageObserver(this.context, this.storage, this.opts.definition, {
        modelNameDidChange: () => this.destroyModel()
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
    return this.__createModel(modelName, props);
  }

}
