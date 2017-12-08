import Model, { prop } from './model';

export default Model.extend({

  storage: prop('storage')

}).reopenClass({

  modelType: 'backed'

});
