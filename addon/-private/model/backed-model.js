import { computed } from '@ember/object';
import Model from './model';

const prop = name => computed(function() {
  return this._internal && this._internal[name];
});

const state = name => computed(function() {
  return this._internal && this._internal.state[name];
});

const storage = () => prop('storage').readOnly();
const isDeleted = () => state('isDeleted').readOnly();

export default Model.extend({

  storage: storage(),
  isDeleted: isDeleted(),

}).reopenClass({

  modelType: 'backed'

});
