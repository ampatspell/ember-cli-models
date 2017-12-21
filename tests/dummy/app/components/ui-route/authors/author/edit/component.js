import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  author: null,

  actions: {
    async saved(author) {
      this.get('router').transitionTo('authors.author', author);
    },
    async cancelled(author) {
      this.get('router').transitionTo('authors.author', author);
    }
  }

});
