import Route from '@ember/routing/route';
import { state } from 'dummy/models/state';

export default Route.extend({

  // temporary
  state: state(),

  model(params) {
    return this.get('state.authors').loadByPermalink(params.author_id);
  }

});
