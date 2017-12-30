import Route from '@ember/routing/route';
import { state } from 'dummy/models/state';

export default Route.extend({

  // temporary
  state: state(),

  model() {
    return this.get('state.authors').build();
  },

  deactivate() {
    // temporary
    this._super(...arguments);
    let model = this.currentModel;
    if(model.get('isNew')) {
      model.destroy();
    }
  }

});
