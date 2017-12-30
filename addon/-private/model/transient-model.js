import Model from './model';

export default Model.extend({

}).reopenClass({

  modelClassType: 'transient',

  toString() {
    return 'transient-model';
  }

});
