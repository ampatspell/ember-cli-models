import destroyable from '../util/destroyable-computed';
import { getStores } from '../util/get-stores';
import { isFunction, isObject, isString, isDatabase } from '../util/assert';

const invoke = (owner, fn) => fn.call(owner, owner, getStores(owner));

const validate = result => {
  isObject('result', result);
  let { database, name } = result;
  isDatabase('result.database', database);
  isString('result.name', name);
  return result;
};

const reusable = () => false;
const get = internal => internal.model(true);
const destroy = internal => internal.destroy();

export const model = (...args) => {
  let fn = args.pop();
  isFunction('last argument', fn);
  return destroyable(...args, {
    create() {
      let result = invoke(this, fn);
      if(!result) {
        return;
      }
      let { database, name, props } = validate(result);
      return database._context.internalModelManager.internalTransientModel(name, props);
    },
    get,
    reusable,
    destroy
  });
};
