import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':ui-route-authors-author-index' ],
  layout,

  actions: {
    edit() {
      this.get('router').transitionTo('authors.author.edit', this.get('author'));
    },
    async delete() {
      await this.get('author').delete();
      this.get('router').transitionTo('authors');
    }
  }
});
