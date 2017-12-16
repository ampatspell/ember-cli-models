import Model, { database, model } from 'ember-cli-models/model/transient';

const state = name => model('database', function() {
  let database = this.get('database');
  let props = { state: this };
  return {
    database,
    name,
    props
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
