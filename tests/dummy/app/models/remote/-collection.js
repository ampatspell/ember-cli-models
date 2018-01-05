import Model from 'ember-cli-models/model/transient';
import { database, loader } from 'ember-cli-models/computed';
import { readOnly } from '@ember/object/computed';
import { filterByType, prop } from '../-computed-remote';

export default Model.extend({

  database: database(),

  type: null,
  view: null,

  all: filterByType({ type: prop('type'), new: false }),

  loader: loader(function(owner, stores) {
    return {
      recurrent: false,
      owner: [ 'type', 'view' ],
      perform() {
        let {
          type: ddoc,
          view
        } = this.getProperties('type', 'view');

        return stores.database('remote', 'main').find({ ddoc, view });
      }
    }
  }),

  _count: readOnly('all.length'),

}).reopenClass({
  debugColumns: [ 'type', '_count' ]
});
