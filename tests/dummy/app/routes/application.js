import Route from '@ember/routing/route';
import { database } from 'ember-cli-models/computed';

export default Route.extend({

  database: database('remote', 'main'),

  model() {
    return this.get('database').model('state');
  }

});
