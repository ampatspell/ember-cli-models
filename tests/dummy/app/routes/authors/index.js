import Route from '@ember/routing/route';
import { database } from 'ember-cli-models/computed';

export default Route.extend({

  // temporary
  database: database('remote', 'main'),

  model() {
    return this.get('database').find({ ddoc: 'author', view: 'by-id' });
  }

});
