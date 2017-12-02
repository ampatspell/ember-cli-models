import Component from '@ember/component';
import layout from './template';
import { stores, store, database } from 'ember-cli-models/computed';

export default Component.extend({
  classNameBindings: [ ':ui-route-index' ],
  layout,

  stores: stores(),
  store: store('remote'),
  database: database('remote', 'main')

});
