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
