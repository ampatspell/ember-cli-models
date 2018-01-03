import Component from '@ember/component';
import layout from './template';
import { stores, store, database, loader } from 'ember-cli-models/computed';
import { state } from 'dummy/models/state';

export default Component.extend({
  classNameBindings: [ ':ui-route-index' ],
  layout,

  stores: stores(),
  store: store('remote'),
  database: database('remote', 'main'),
  state: state(),

  ddoc: null,
  view: null,

  loader: loader(function(owner, stores) {
    return {
      recurrent: false,
      owner: [ 'ddoc', 'view' ],
      perform() {
      }
    };
  }),

  init() {
    this._super(...arguments);
    window.component = this;
  },

  actions: {
    async setup() {
      let setup = await this.get('state.design').recreate();
      this.set('setup', setup);
    }
  }

});
