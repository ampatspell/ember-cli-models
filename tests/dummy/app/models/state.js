import Model from 'ember-cli-models/model/transient';
import { database, model } from 'ember-cli-models/computed';
import { findByModelType } from './-computed';

export const state = () => findByModelType({ store: 'local', database: 'main', type: 'state' });

const remote = name => model(function() {
  return {
    database: this.get('remote'),
    name,
    props: { state: this }
  };
});

export default Model.extend({

  database: database(),

  remote: database('remote', 'main'),

  changes: remote('state/changes'),
  design:  remote('state/design'),

  authors: remote('authors'),
  blogs:   remote('blogs'),

  async start() {
    await this.get('changes').start();
    return this;
  }

});
