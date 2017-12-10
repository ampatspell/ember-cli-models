import Component from '@ember/component';
import layout from './template';
import { stores, store, database } from 'ember-cli-models/computed';

export default Component.extend({
  classNameBindings: [ ':ui-route-index' ],
  layout,

  stores: stores(),
  store: store('remote'),
  database: database('remote', 'main'),

  actions: {
    select(model) {
      this.set('selected', model);
    },
    saveAuthor() {
      let model = this.get('database').model('author', { name: 'ampatspell' });
      model.save();
    }
  }

});
