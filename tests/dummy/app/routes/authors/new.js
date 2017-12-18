import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  // temporary
  state: service(),

  model() {
    return this.get('state.blogs').buildAuthor();
  },

  deactivate() {
    this._super(...arguments);
    let model = this.currentModel;
    if(model.get('isNew')) {
      model.destroy();
    }
  }

});
