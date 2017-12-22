import Component from '@ember/component';
import layout from './template';
import { find } from 'ember-cli-models/model/computed';

export default Component.extend({
  classNameBindings: [ ':ui-route-wip' ],
  layout,

  state: find('thing', function(owner, stores) {
    return {
      source: stores.database('remote', 'main'),
      owner: [],
      model: [ 'modelType' ],
      matches(model) {
        return model.get('modelType') === 'state';
      }
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    window.component = this;
  }

});
