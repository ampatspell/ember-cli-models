import EmberObject, { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
import { BaseMixin, prop } from './base';
import { keys } from './internal/loader-state';

const state = key => computed(function() {
  return this._internal.stateProperty(key, false);
}).readOnly();

const StateMixin = Mixin.create(keys.reduce((props, key) => {
  props[key] = state(key);
  return props;
}, {
  state: prop('state')
}));

const autoload = () => computed(function() {
  return this._internal.autoload(true);
}).readOnly();

export default EmberObject.extend(BaseMixin, StateMixin, {

  autoload: autoload()

});
