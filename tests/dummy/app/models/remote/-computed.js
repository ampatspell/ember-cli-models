import { find as _find } from 'ember-cli-models/model/computed';
import { assign } from '@ember/polyfills';

export const find = fn => _find(function(owner, stores) {
  let opts = fn.call(this, ...arguments);
  if(!opts) {
    return;
  }
  return assign({
    source: stores.database('remote', 'main'),
    owner: [],
    model: [],
  }, opts);
});
