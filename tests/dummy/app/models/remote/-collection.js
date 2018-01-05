import Model from 'ember-cli-models/model/transient';
import { database } from 'ember-cli-models/computed';
import { readOnly } from '@ember/object/computed';
import { filterByType, prop, view } from '../-computed-remote';

export default Model.extend({

  database: database(),

  type: null,
  view: null,

  all: filterByType({ type: prop('type'), new: false }),

  loader: view({ ddoc: prop('type'), view: prop('view') }),

  _count: readOnly('all.length'),

}).reopenClass({
  debugColumns: [ 'type', '_count' ]
});
