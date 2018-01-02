import Model from 'dummy/stack/documents/document-model';
import { attr, prefixed, fallback } from 'dummy/stack/documents/computed';
import { manyToManyInverse } from '../-computed-remote';

export default Model.extend({

  id: prefixed('author:'),

  name: attr('name'),
  email: attr('email'),

  screenName: fallback('name', 'Unnamed'),

  blogs: manyToManyInverse({ key: 'editors', type: 'blog' }),

  willCreate() {
    let id = this.get('name').toLowerCase().replace(/ /g, '-');
    this.set('storage.id', `author:${id}`);
  }

}).reopenClass({
  debugColumns: [ 'id', 'name', 'email' ]
});
