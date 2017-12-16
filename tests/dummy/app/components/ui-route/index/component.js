import Component from '@ember/component';
import layout from './template';
import { stores, store, database } from 'ember-cli-models/computed';
import { inject as service } from '@ember/service';
import { dummy } from 'dummy/models/remote/dummy';

export default Component.extend({
  classNameBindings: [ ':ui-route-index' ],
  layout,

  stores: stores(),
  store: store('remote'),
  database: database('remote', 'main'),

  state: service(),
  dummy: dummy(),

  actions: {
    async setup() {
      let setup = await this.get('state.design').recreate();
      this.set('setup', setup);
    }
  }

});
