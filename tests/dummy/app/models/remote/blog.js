import Model, { attr, fallback } from './model';
import { filter } from 'ember-cli-models/model/computed';

const hasManyPersisted = opts => filter(function() {
  return {
    source: this.get('database'),
    owner: [ `storage.${opts.key}.[]` ],
    model: [ 'storage.id' ],
    matches(model, owner) {
      let editors = owner.get(`storage.${opts.key}`);
      return editors.includes(model.get('storage.id'));
    }
  }
});

export default Model.extend({

  id: attr('id'),
  name: attr('name'),

  screenName: fallback('name', 'Unnamed'),

  editors: hasManyPersisted({ key: 'editors' }),

});
