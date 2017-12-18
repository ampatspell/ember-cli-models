import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':ui-route-authors-new' ],
  layout,

  author: null,

  actions: {
    async save() {
      await this.get('author').save();
      this.get('router').transitionTo('authors');
    },
    async cancel() {
      // TODO: rollback
      this.get('router').transitionTo('authors');
    }
  }

});
