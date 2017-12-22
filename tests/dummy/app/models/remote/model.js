import { computed } from '@ember/object';

import Model from '../../stack/documents/models/model';
export * from '../../stack/documents/models/model';

import { database } from 'ember-cli-models/model/computed';

export const fallback = (key, fallbackValue) => computed(key, function() {
  let value = this.get(key);
  if(value) {
    return value;
  }
  return fallbackValue;
});

export const prefixed = prefix => {
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

export default Model.extend({
  database: database()
});
