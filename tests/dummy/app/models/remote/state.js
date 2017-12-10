import { computed } from '@ember/object';
import Model, { database } from 'ember-cli-models/model/transient';

export default Model.extend({

  database: database(),

  // temporary
  changes: computed(function() {
    return this.get('database').model('state/changes');
  }).readOnly(),

  // temporary
  design: computed(function() {
    return this.get('database').model('state/design');
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
