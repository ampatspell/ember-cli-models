import Route from '@ember/routing/route';
import { database } from 'ember-cli-models/computed';

export default Route.extend({

  database: database('remote', 'main'),

  model(params) {
    // temporary
    let id = `author:${params.author_id}`;
    return this.get('database').find({ id });
  }

});
