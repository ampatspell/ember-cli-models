import Model from 'ember-cli-models/model/transient';
// import { database as lookupDatabase } from 'ember-cli-models/util';
import { database, model } from 'ember-cli-models/model/computed';

// export const state = () => find(function() {
//   let source = lookupDatabase(this, 'remote', 'main');
//   return {
//     source,
//     owner: [],
//     model: [],
//     matches(model) {
//       return model.get('modelType') === 'state';
//     }
//   };
// });

const nested = name => model('database', function() {
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

  changes: nested('changes'),
  design:  nested('design'),
  blogs:   nested('blogs'),

  async start() {
    await this.get('changes').start();
    return this;
  }

});
