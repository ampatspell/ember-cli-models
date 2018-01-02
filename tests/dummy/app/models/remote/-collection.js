import Model from 'ember-cli-models/model/transient';
import { database, filter } from 'ember-cli-models/computed';
import { readOnly } from '@ember/object/computed';
import { filterByType } from '../-computed-remote';
import { prop } from '../-prop';

export default Model.extend({

  database: database(),

  type: null,
  all: filterByType({ type: prop('type'), new: false }),

  _count: readOnly('all.length'),

}).reopenClass({
  debugColumns: [ 'type', '_count' ]
});
