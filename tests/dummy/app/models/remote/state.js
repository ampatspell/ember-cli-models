import { computed } from '@ember/object';
import Model, { database } from 'ember-cli-models/model/transient';
import createTransientModel from 'ember-cli-models/-private/computed/transient-model';

const state = name => createTransientModel('database', function() {
  let database = this.get('database');
  return {
    database,
    name,
    props: { state: this }
  };
});

export default Model.extend({

  database: database(),

  changes: state('state/changes'),
  design:  state('state/design'),

  async start() {
    await this.get('changes').start();
    return this;
  }

});
