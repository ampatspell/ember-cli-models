import Model, { attr } from './model';
import { computed } from '@ember/object';

const prefixed = prefix => {
  return computed('storage.id', {
    get() {
      let id = this.get('storage.id');
      if(!id) {
        return;
      }
      if(!id.startsWith(prefix)) {
        return;
      }
      return id.substr(prefix.length);
    },
    set(_, value) {
      if(value) {
        let id = `${prefix}${value}`;
        this.set('storage.id', id);
      }
      return value;
    }
  });
};

const fallback = (key, fallbackValue) => computed(key, function() {
  let value = this.get(key);
  if(value) {
    return value;
  }
  return fallbackValue;
});

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
