import { computed } from '@ember/object';
import Model, { database, store, stores } from 'ember-cli-models/model/transient';

export default Model.extend({

  database: database(),
  store: store(),
  stores: stores(),

  // temporary
  changes: computed(function() {
    window.state = this;
    let database = this.get('database');
    return database.model('changes');
  }).readOnly(),

  async start() {
    await this.get('changes').start();
    return this;
  },

  willDestroy() {
    this._super(...arguments);
    let changes = this.get('changes');
    changes.destroy();
  }

});
