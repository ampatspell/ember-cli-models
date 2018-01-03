import EmberObject, { computed } from '@ember/object';
import { BaseMixin } from './base';

const autoload = () => computed(function() {
  return this._internal.autoload(true);
}).readOnly();

export default EmberObject.extend(BaseMixin, {

  autoload: autoload()

});
