import { isObject, isArray, isFunction, assert } from '../../util/assert';
import ObjectObserver from '../../util/object-observer';
import { call as delegateCall } from '../../util/function-call';

export default class StorageObserver {

  constructor({ context, storage, delegate }) {
    this._context = context;
    this._storage = storage;
    this._delegate = delegate;
    this._definition = this._lookupDefinition();
    this._modelName = this._lookupModelName();
    this._observer = new ObjectObserver(storage, this._definition.observe, key => this._storageValueForKeyDidChange(key));
  }

  _notifyDelegate(name) {
    let delegate = this._delegate;
    delegateCall(delegate.target, delegate[name]);
  }

  _lookupDefinition() {
    let definition = this._context.adapter.modelDefinitionForStorage(this._storage);
    isObject('definition', definition);
    isArray('definition.observe', definition.observe);
    isFunction('definition.name', definition.name);
    return definition;
  }

  _lookupModelName() {
    let name = this._definition.name(this._storage);
    assert(`definition.name must return model name`, !!name);
    return this._context.internalModelManager.modelNameForName(name);
  }

  get modelName() {
    return this._modelName;
  }

  _storageValueForKeyDidChange() {
    let modelName = this._lookupModelName();
    if(modelName === this._modelName) {
      return;
    }
    this._modelName = modelName;
    this._notifyDelegate('modelNameDidChange');
  }

  destroy() {
    this._observer && this._observer.destroy();
  }

}
