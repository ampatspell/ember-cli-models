import Route from '@ember/routing/route';
import { state } from 'dummy/models/state';

export default Route.extend({

  state: state(),

  model() {
    return this.get('state.authors.loader').load();
  }

});
