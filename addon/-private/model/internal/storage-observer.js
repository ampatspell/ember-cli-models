import { isObject, isArray, isFunction, assert } from '../../util/assert';
import ObjectObserver from './object-observer';

export default class StorageObserver {

  constructor(context, storage, delegate) {
    this._context = context;
    this._storage = storage;
    this._delegate = delegate;
    this._definition = this._lookupDefinition();
    this._modelName = this._lookupModelName();
    this._observer = new ObjectObserver(storage, this._definition.observe, key => this._storageValueForKeyDidChange(key));
  }

  _lookupDefinition() {
    let definition = this._context.adapter.modelDefinitionForStorage(this._storage);
    isObject('definition', definition);
    isArray('definition.observe', definition.observe);
    isFunction('definition.name', definition.name);
    return definition;
  }

  _lookupModelName() {
    let modelName = this._definition.name(this._storage);
    assert(`definition.name must return model name`, !!modelName);
    return modelName;
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
    this._delegate.modelNameDidChange();
  }

  destroy() {
    this._observer && this._observer.destroy();
  }

}
