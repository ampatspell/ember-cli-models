import Model, { database } from 'ember-cli-models/model/transient';

export default Model.extend({

  database: database(),

  changes: null,

  // temporary
  init() {
    this._super(...arguments);
    let database = this.get('database');
    this.changes = database.model('changes');
  },

  willDestroy() {
    this._super(...arguments);
    this.changes.destroy();
  }

});
