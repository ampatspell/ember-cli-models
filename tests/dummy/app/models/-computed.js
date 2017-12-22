import { find as _find, filter as _filter } from 'ember-cli-models/computed';
import { assign } from '@ember/polyfills';

const withDefaults = fn => function(owner, stores) {
  let opts = fn.call(this, ...arguments);
  if(!opts) {
    return;
  }
  opts = assign({ owner: [], model: [] }, opts);
  if(!opts.source) {
    opts.source = owner.get('database') || stores.database('remote', 'main');
  }
  return opts;
};

export const find = fn => _find(withDefaults(fn));
export const filter = fn => _filter(withDefaults(fn));

// Lookups models by by storage ids
//
// { key: 'blog_posts', type: 'post' }
//
// owner: {
//   ...
//   blog_posts: [ 'post:1', 'post:2' ],
// }
export const hasManyPersisted = opts => filter(function() {
  return {
    owner: [ `storage.${opts.key}.[]` ],
    model: [ 'storage.id' ],
    matches(model, owner) {
      if(model.get('modelType') !== opts.type) {
        return;
      }
      let array = owner.get(`storage.${opts.key}`);
      if(!array) {
        return;
      }
      return array.includes(model.get('storage.id'));
    }
  }
});

// Lookups models which includes owner in an array
//
// model: {
//   editors: [ <model/blog>, <model>,... ]
// }
//
// { key: 'editors', type: 'blog' }
export const manyToManyInverse = opts => filter(function() {
  return {
    owner: [],
    model: [ 'modelType', `${opts.key}.[]` ],
    matches(model, owner) {
      let { modelType, [opts.key]: array } = model.getProperties('modelType', opts.key);
      return modelType === opts.type && array.includes(owner);
    }
  };
});
