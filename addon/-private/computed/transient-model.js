import { computed } from '@ember/object';
import { isFunction, isObject, isInstance } from '../util/assert';

export default (...args) => {
  let fn = args.pop();
  isFunction('last argument', fn);
  return computed(...args, function() {
    let result = fn.call(this, this);
    if(!result) {
      return;
    }

    isObject('result', result);
    let { database, name, props } = result;
    isInstance('database', database);

    // TODO: this should create only transient models
    // TODO: this should register created model for destroy
    return database._context.internalModelManager._createInternalModel(name, props).model(true);
  }).readOnly();
};
