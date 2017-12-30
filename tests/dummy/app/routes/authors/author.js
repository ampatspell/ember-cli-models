import Route from '@ember/routing/route';
import { state } from 'dummy/models/state';

export default Route.extend({

  // temporary
  state: state(),

  model(params) {
    return this.get('state.blogs.authors').loadByPermalink(params.author_id);
  }

});
