import { assign } from '@ember/polyfills';
import { find as _find, model as _model } from 'ember-cli-models/computed';

// opts: { store, database }
const sourceFromOptions = (owner, stores, opts) => {
  let { store, database } = opts;
  return stores.database(store, database);
}

// opts: { store, database, type }
export const findByType = opts => {
  return _find(function(owner, stores) {
    return {
      source: sourceFromOptions(owner, stores, opts),
      model: [ 'modelType' ],
      owner: [],
      matches(model) {
        return model.get('modelType') === opts.type;
      }
    };
  });
}

// opts: { store, database }
// fn: { name, props }
export const model = (opts, fn) => {
  return _model(function(owner, stores) {
    let hash = fn.call(this, ...arguments);
    if(!hash) {
      return;
    }
    let database = sourceFromOptions(owner, stores, opts);
    return assign({ database }, hash);
  });
}

// database: { store, database }
export const withDatabase = database => {
  const mergeDatabase = opts => assign({}, database, opts);
  return {
    findByType: opts => findByType(mergeDatabase(opts)),
    model:      fn => model(mergeDatabase(), fn)
  };
}
