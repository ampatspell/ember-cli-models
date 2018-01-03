import destroyable from '../util/destroyable-computed';
import { getStores } from '../util/get-stores';
import { isObject, isBoolean, isDatabase, isArray, isFunction } from '../util/assert';

const invoke = (owner, fn) => fn.call(owner, owner, getStores(owner));

const validate = result => {
  isObject('result', result);
  let { recurrent, database, owner, query, loaded } = result;
  isBoolean('result.recurrent', recurrent);
  isDatabase('result.database', database);
  isArray('result.owner', owner);
  isFunction('result.query', query);
  isFunction('result.loaded', loaded);
  return result;
};

const reusable = () => false;
const get = internal => internal.model(true);
const destroy = internal => internal.destroy();

export const loader = (...args) => {
  let fn = args.pop();
  isFunction('last argument', fn);
  return destroyable(...args, {
    create() {
      let result = invoke(this, fn);
      if(!result) {
        return;
      }
      let { database, recurrent, owner, query, loaded } = validate(result);
      console.log(database+'', recurrent, owner, query, loaded);
      // return database._context.internalModelManager.internalTransientModel(name, props);
    },
    get,
    reusable,
    destroy
  });
};
