import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':ui-route-authors-new' ],
  layout,

  author: null,

  actions: {
    saved(author) {
      this.get('router').transitionTo('authors.author', author);
    },
    cancelled() {
      this.get('router').transitionTo('authors');
    }
  }

});
