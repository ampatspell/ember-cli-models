import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':ui-route-authors-author-index' ],
  layout,

  actions: {
    async delete() {
      await this.get('author').delete();
      this.get('router').transitionTo('authors');
    }
  }
});
