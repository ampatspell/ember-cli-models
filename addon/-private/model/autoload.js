import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import { keys } from './internal/loader-state';

const state = key => computed(`loader.${key}`, function() {
  let internal = this.get('loader')._internal;
  return internal.getStateProperty(key, true);
}).readOnly();

let StateMixin = Mixin.create(keys.reduce((props, key) => {
  props[key] = state(key);
  return props;
}, {
  state: readOnly('loader.state')
}));

export default EmberObject.extend(StateMixin, {

  loader: null

});
