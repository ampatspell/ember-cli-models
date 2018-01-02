import Model from 'ember-cli-models/model/transient';
import { findByType } from './-computed-local';
import { model } from './-computed-remote';

export const state = () => findByType({ type: 'state' });

const remote = name => model(function() {
  return {
    name,
    props: { state: this }
  };
});

export default Model.extend({

  changes: remote('state/changes'),
  design:  remote('state/design'),

  authors: remote('authors'),
  blogs:   remote('blogs'),

  async start() {
    await this.get('changes').start();
    return this;
  }

});
