import { A } from '@ember/array';
import destroyable from '../util/destroyable-computed';
import { getStores } from '../util/get-stores';
import { isObject, isBoolean, isArray, isFunction } from '../util/assert';

const invoke = (owner, fn, stores) => fn.call(owner, owner, stores);

// {
//   recurrent: false,
//   owner: [ 'ddoc', 'view' ],
//   perform(state, owner) {
//     let { ddoc, view } = owner.getProperties('ddoc', 'view');
//     return stores.database('remote', 'main').find({ ddoc, view }).then(docs => {
//       return {
//         isMore: false,
//         state: { ... }
//       }
//     });
//   }
// }
//
// to
//
// {
//   operation: { recurrent, perform },
//   owner: { object, observe }
// }

const validate = (object, result) => {
  isObject('result', result);

  let { recurrent, owner, perform } = result;

  isBoolean('result.recurrent', recurrent);
  isArray('result.owner', owner);
  isFunction('result.perform', perform);

  owner = A(owner).compact();

  return {
    operation: {
      recurrent,
      perform,
    },
    owner: {
      object: object,
      observe: owner
    }
  };
};

const reusable = () => false;
const get = internal => internal.model(true);
const destroy = internal => internal.destroy();

export const loader = (...args) => {
  let fn = args.pop();
  isFunction('last argument', fn);
  return destroyable(...args, {
    create() {
      let stores = getStores(this);
      let result = invoke(this, fn, stores);
      if(!result) {
        return;
      }
      let opts = validate(this, result);
      return stores._context.internalLoaderManager.internalLoader(opts);
    },
    get,
    reusable,
    destroy
  });
};
