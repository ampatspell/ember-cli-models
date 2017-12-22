import Model from 'ember-cli-models/model/transient';
import { database, model } from 'ember-cli-models/model/computed';
import { find } from './-computed';

export const state = () => find(function() {
  return {
    model: [ 'modelType' ],
    matches(model) {
      return model.get('modelType') === 'state';
    }
  };
});

const nested = name => model('database', function() {
  return {
    database: this.get('database'),
    name: `state/${name}`,
    props: { state: this }
  };
});

export default Model.extend({

  database: database(),

  changes: nested('changes'),
  design:  nested('design'),
  blogs:   nested('blogs'),

  async start() {
    await this.get('changes').start();
    return this;
  }

});
