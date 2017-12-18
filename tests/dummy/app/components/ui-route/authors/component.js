import Component from '@ember/component';
import layout from './template';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: [ ':ui-route-authors' ],
  layout,

  state: service(),
  authors: readOnly('state.blogs.authors'),

  actions: {
    select(author) {
      if(author.get('isNew')) {
        return;
      }
      this.get('router').transitionTo('authors.author', author);
    }
  }

});
