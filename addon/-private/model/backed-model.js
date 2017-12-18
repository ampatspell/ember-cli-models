import { computed } from '@ember/object';
import Model from './model';
import { prop } from './base';

const state = name => computed(function() {
  return this._internal && this._internal.state[name];
}).readOnly();

const storage = () => prop('storage');
const isDeleted = () => state('isDeleted');

export default Model.extend({

  storage: storage(),
  isDeleted: isDeleted(),

}).reopenClass({

  modelClassType: 'backed'

});
