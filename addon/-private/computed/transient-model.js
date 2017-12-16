import { computed } from '@ember/object';
import destroyable from '../util/destroyable-computed';
import { lookupStores } from './globals';
import { isFunction, isObject, isInstance } from '../util/assert';

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
      isInstance('database', database);

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
