import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':ui-route-authors' ],
  layout,

  actions: {
    select(author) {
      this.get('router').transitionTo('authors.author', author);
    }
  }

});