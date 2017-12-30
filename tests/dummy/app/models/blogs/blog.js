import Model from 'dummy/stack/documents/model';
import { attr, fallback } from 'dummy/stack/documents/computed';
import { hasManyPersisted } from '../-computed';

export default Model.extend({

  id: attr('id'),
  name: attr('name'),

  screenName: fallback('name', 'Unnamed'),

  editors: hasManyPersisted({ key: 'editors', type: 'author' })

}).reopenClass({
  debugColumns: [ 'id', 'name' ]
});
