import Model, { attr, prefixed, fallback } from './model';
import { computed } from '@ember/object';

export default Model.extend({

  id: prefixed('author:'),

  name: attr('name'),
  email: attr('email'),

  screenName: fallback('name', 'Unnamed'),

  willCreate() {
    let id = this.get('name').toLowerCase().replace(/ /g, '-');
    this.set('storage.id', `author:${id}`);
  }

});
