import destroyable from '../util/internal-destroyable-computed';
import { lookupStores } from './globals';
import { isFunction, isObject, isString, isDatabase } from '../util/assert';

const invoke = (owner, fn) => {
  let stores = lookupStores(owner);
  return fn.call(owner, owner, stores);
};

const validate = result => {
  isObject('result', result);
  let { database, name } = result;
  isDatabase('result.database', database);
  isString('result.name', name);
  return result;
};

export default (...args) => {
  let fn = args.pop();
  isFunction('last argument', fn);
  return destroyable(...args, function() {
    let result = invoke(this, fn);
    if(!result) {
      return;
    }
    let { database, name, props } = validate(result);
    return database._context.internalModelManager.internalTransientModel(name, props);
  }).readOnly();
};
