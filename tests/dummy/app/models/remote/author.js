import Model from 'dummy/stack/documents/document-model';
import { attr, prefixed, fallback } from 'dummy/stack/documents/computed';
import { manyToManyInverse } from './-computed';

export default Model.extend({

  id: prefixed('author:'),

  name: attr('name'),
  email: attr('email'),

  screenName: fallback('name', 'Unnamed'),

  blogs: manyToManyInverse({ type: 'blog', key: 'editors' }),

  willCreate() {
    let id = this.get('name').toLowerCase().replace(/ /g, '-');
    this.set('storage.id', `author:${id}`);
  }

}).reopenClass({
  debugColumns: [ 'id', 'name', 'email' ]
});
