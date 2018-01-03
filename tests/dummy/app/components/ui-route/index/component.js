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
  autoload: false,

  loader: loader(function(owner, stores) {
    return {
      recurrent: false,
      owner: [ 'ddoc', 'view' ],
      perform() {
        return stores.database('remote', 'main').find({ all: true }).then(models => {
          return {
            isMore: false,
            state: {
              loaded: models.get('length')
            }
          };
        });
      }
    };
  }),

  init() {
    this._super(...arguments);
    window.component = this;
  },

  actions: {
    enableAutoload() {
      this.set('autoload', true);
    },
    async setup() {
      let setup = await this.get('state.design').recreate();
      this.set('setup', setup);
    }
  }

});
