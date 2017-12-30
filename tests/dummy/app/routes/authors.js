import Route from '@ember/routing/route';
import { state } from 'dummy/models/state';

export default Route.extend({

  // temporary
  state: state(),

  model() {
    return this.get('state.blogs.authors').loadAll();
  }

});
