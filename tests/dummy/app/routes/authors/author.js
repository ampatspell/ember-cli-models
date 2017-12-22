import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  // temporary
  state: service(),

  model(params) {
    return this.get('state.blogs.authors').loadByPermalink(params.author_id);
  }

});
