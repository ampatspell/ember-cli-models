const withKeys = (object, keys, cb) => {
  if(!keys || keys.length === 0) {
    return;
  }
  keys.map(key => cb(key));
}

export const startObservingObject = (object, keys, target, method) => {
  withKeys(object, keys, key => object.addObserver(key, target, method));
}

export const stopObservingObject = (object, keys, target, method) => {
  withKeys(object, keys, key => object.removeObserver(key, target, method));
}

export const startObservingObjects = (objects, keys, target, method) => {
  objects.map(object => startObservingObject(object, keys, target, method));
}

export const stopObservingObjects = (objects, keys, target, method) => {
  objects.map(object => stopObservingObject(object, keys, target, method));
}

export default class ObjectObserver {

  constructor(object, observe, delegate) {
    this._object = object;
    this._observe = observe;
    this._delegate = delegate;
    this._startObserving();
  }

  _startObserving() {
    startObservingObject(this._object, this._observe, this, this._objectValueForKeyDidChange);
  }

  _stopObserving() {
    stopObservingObject(this._object, this._observe, this, this._objectValueForKeyDidChange);
  }

  _objectValueForKeyDidChange(object, key) {
    this._delegate(key);
  }

  destroy() {
    this._stopObserving();
  }

}
