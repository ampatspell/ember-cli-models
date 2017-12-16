import Model, { database, model } from 'ember-cli-models/model/transient';

const state = name => model('database', function() {
  let database = this.get('database');
  let props = { state: this };
  return {
    database,
    name: `state/${name}`,
    props
  };
});

export default Model.extend({

  database: database(),

  changes: state('changes'),
  design:  state('design'),
  blogs:   state('blogs'),

  async start() {
    await this.get('changes').start();
    return this;
  }

});
