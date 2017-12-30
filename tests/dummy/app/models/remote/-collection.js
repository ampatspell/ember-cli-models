import Model from 'ember-cli-models/model/transient';
import { database, filter } from 'ember-cli-models/computed';
import { readOnly } from '@ember/object/computed';

const all = () => filter('database', function() {
  let source = this.get('database');
  if(!source) {
    return;
  }
  let modelType = this.get('type');
  if(!modelType) {
    return;
  }
  return {
    source,
    owner: [],
    model: [ 'modelType', 'isNew' ],
    matches(model) {
      if(model.get('isNew') === true) {
        return;
      }
      return model.get('modelType') === modelType;
    }
  };
});

export default Model.extend({

  database: database(),
  all: all(),

  type: null,

  _count: readOnly('all.length'),

}).reopenClass({
  debugColumns: [ 'type', '_count' ]
});
