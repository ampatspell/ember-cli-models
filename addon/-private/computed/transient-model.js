import destroyable from '../util/destroyable-computed';
import { lookupStores } from './globals';
import { isFunction, isObject, isString, isDatabase } from '../util/assert';

export default (...args) => {
  let fn = args.pop();
  isFunction('last argument', fn);

  return destroyable(...args, {
    create() {
      let stores = lookupStores(this);
      let result = fn.call(this, this, stores);

      if(!result) {
        return;
      }

      isObject('result', result);
      let { database, name, props } = result;
      isDatabase('result.database', database);
      isString('result.name', name);

      return database._context.internalModelManager.internalTransientModel(name, props);
    },
    get(internal) {
      return internal.model(true);
    },
    destroy(internal) {
      internal.destroy();
    }
  }).readOnly();
};
