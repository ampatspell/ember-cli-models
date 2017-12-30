import Component from '@ember/component';
import layout from './template';
import { state } from 'dummy/models/state';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: [ ':ui-route-authors' ],
  layout,

  state: state(),
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
