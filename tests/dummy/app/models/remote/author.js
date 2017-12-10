import Model, { attr } from './model';
import { computed } from '@ember/object';

const prefixed = (prefix, ...args) => {
  let fn = args.pop();
  return computed('isNew', 'storage.id', ...args, {
    get() {
      if(this.get('isNew')) {
        let value = fn.call(this);
        if(value) {
          return `${prefix}${value}`;
        }
      }
      return this.get('storage.id');
    }
  });
};

export default Model.extend({

  id: prefixed('author:', 'name', function() {
    let name = this.get('name');
    return name.toLowerCase().replace(/ /g, '-');
  }),

  name: attr('name'),
  email: attr('email'),

  willCreate() {
    let id = this.get('id');
    this.set('storage.id', id);
  }

});
