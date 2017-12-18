import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  author: null,

  actions: {
    async save() {
      // temporary
      let author = this.get('author');
      await author.save();
      this.get('router').transitionTo('authors.author', author);
    },
    async cancel() {
      // temporary
      let author = this.get('author');
      await author.reload();
      this.get('router').transitionTo('authors.author', author);
    }
  }

});
