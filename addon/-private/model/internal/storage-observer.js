import ObjectObserver from './object-observer';

const INVALIDATED = {};

export default class StorageObserver {

  constructor(context, storage, definition, delegate) {
    this._context = context;
    this._storage = storage;
    this._definition = definition;
    this._delegate = delegate;
    this._observer = new ObjectObserver(storage, definition.observe, key => this._storageValueForKeyDidChange(key));
    this._modelName = INVALIDATED;
  }

  _lookupModelName() {
    return this._context.adapter.modelNameForStorage(this._storage);
  }

  get modelName() {
    let modelName = this._modelName;
    if(modelName === INVALIDATED) {
      if(modelName) {
        modelName = this._lookupModelName();
        this._modelName = modelName;
      }
    }
    return modelName;
  }

  _storageValueForKeyDidChange() {
    let modelName = this._lookupModelName();
    if(modelName === this._modelName) {
      return;
    }
    this._modelName = modelName;
    this._delegate.modelNameDidChange();
  }

  destroy() {
    this._observer.destroy();
  }

}
