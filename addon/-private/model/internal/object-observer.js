export default class ObjectObserver {

  constructor(object, observe, delegate) {
    this._object = object;
    this._observe = observe;
    this._delegate = delegate;
    this._startObserving();
  }

  _withKeys(cb) {
    let keys = this._observe;
    if(keys.length === 0) {
      return;
    }
    let object = this._object;
    keys.map(key => cb(object, key));
  }

  _startObserving() {
    this._withKeys((object, key) => object.addObserver(key, this, this._objectValueForKeyDidChange));
  }

  _stopObserving() {
    this._withKeys((object, key) => object.removeObserver(key, this, this._objectValueForKeyDidChange));
  }

  _objectValueForKeyDidChange(object, key) {
    this._delegate(key);
  }

  destroy() {
    this._stopObserving();
  }

}
