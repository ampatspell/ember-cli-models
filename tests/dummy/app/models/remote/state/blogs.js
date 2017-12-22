import Model from 'ember-cli-models/model/transient';
import { database } from 'ember-cli-models/computed';
import { model } from 'ember-cli-models/model/computed';

const nested = name => model(function() {
  let database = this.get('database');
  return {
    database,
    name: `state/blogs/${name}`
  };
});

export default Model.extend({

  database: database(),

  authors: nested('authors')

});
