import Model from 'ember-cli-models/model/transient';
import { database } from 'ember-cli-models/computed';
import { readOnly } from '@ember/object/computed';
import { filterByType, prop } from '../-computed-remote';

export default Model.extend({

  database: database(),

  type: null,
  all: filterByType({ type: prop('type'), new: false }),

  _count: readOnly('all.length'),

}).reopenClass({
  debugColumns: [ 'type', '_count' ]
});
