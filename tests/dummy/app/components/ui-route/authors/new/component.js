import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  classNameBindings: [ ':ui-route-authors-new' ],
  layout,

  author: null,

  actions: {
    async save() {
      let author = this.get('author');
      await author.save();
      this.get('router').transitionTo('authors.author', author);
    },
    async cancel() {
      // TODO: rollback
      this.get('router').transitionTo('authors');
    }
  }

});
