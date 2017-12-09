import Component from '@ember/component';
import layout from './template';
import { stores, store, database } from 'ember-cli-models/computed';

export default Component.extend({
  classNameBindings: [ ':ui-route-index' ],
  layout,

  stores: stores(),
  store: store('local'),
  database: database('local', 'main'),

  actions: {
    select(mdoel) {
      this.set('selected', model);
    }
  }

});
