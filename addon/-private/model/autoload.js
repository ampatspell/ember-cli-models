import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';

const state = () => readOnly('loader.state');

const autoloaded = key => computed(`loader.${key}`, function() {
  return this.get('loader')._internal.stateProperty(key, true);
});

let StateMixin = Mixin.create({
  state: state(),
  isLoading: autoloaded('isLoading'),
  isLoaded: autoloaded('isLoaded')
});

export default EmberObject.extend(StateMixin, {

  loader: null,

});
