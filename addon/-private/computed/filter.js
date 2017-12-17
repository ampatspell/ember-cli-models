import destroyable from '../util/internal-destroyable-computed';
import stores from '../util/lookup-stores';
import { isFunction, isObject, isArray, isArrayArrayProxyOrHasIdentity } from '../util/assert';

const invoke = (owner, fn) => fn.call(owner, owner);

// {
//   source: <database|store|stores|...>,
//   owner: [ 'type' ],
//   model: [ 'type' ],
//   matches(model, owner) {
//     return model.get('type') === owner.get('type');
//   }
// }
//
// to
//
// {
//   source: { object, observe, matches }
//   owner: { object, observe }
// }

const validate = (object, result) => {
  isObject('result', result);

  let { source, owner, model, matches } = result;

  isArrayArrayProxyOrHasIdentity('result.source', source);
  isArray('result.owner', owner);
  isArray('result.model', model);
  isFunction('result.matches', matches);

  return {
    source: {
      object:  source,
      observe: model,
      matches: matches
    },
    owner: {
      object: object,
      observe: owner
    }
  };
};

const base = (args, create) => {
  let fn = args.pop();
  isFunction('last argument', fn);
  return destroyable(...args, function() {
    let result = invoke(this, fn);
    if(!result) {
      return;
    }
    let args = validate(this, result);
    let manager = stores(this)._context.internalFilterManager;
    return create(manager, args);
  });
};

export const find   = (...args) => base(args, (manager, args) => manager.internalFind(args));
export const filter = (...args) => base(args, (manager, args) => manager.internalFirst(args));
