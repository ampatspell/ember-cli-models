import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  // temporary
  state: service(),

  model(params) {
    return this.get('state.blogs').loadAuthorByPermalink(params.author_id);
  }

});
