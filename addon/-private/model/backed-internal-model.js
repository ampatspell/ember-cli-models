import InternalModel from './internal-model';
import BackedModel from './backed-model';
import StorageObserver from './internal/storage-observer';
import State from './internal/state';
import withPropertyChanges from './internal/with-property-changes';

export default class BackedInternalModel extends InternalModel {

  constructor(context, props, storage) {
    super(context, { props });
    this.state = new State();
    this.storage = storage;
  }

  _withState(notify, cb) {
    withPropertyChanges(this, notify, changed => {
      cb(this.state, changed);
    });
  }

  onCreated(notify) {
    this._withState(notify, (state, changed) => state.onCreated(changed));
  }

  onDeleted(notify) {
    this._withState(notify, (state, changed) => state.onDeleted(changed));
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

  modelName(create) {
    return this.observer(create).modelName;
  }

  _createModel() {
    let modelName = this.modelName(true);
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
