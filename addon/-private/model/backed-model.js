import Model, { prop, state } from './model';

const storage = () => prop('storage').readOnly();
const isDeleted = () => state('isDeleted').readOnly();

export default Model.extend({

  storage: storage(),
  isDeleted: isDeleted(),

}).reopenClass({

  modelType: 'backed'

});
