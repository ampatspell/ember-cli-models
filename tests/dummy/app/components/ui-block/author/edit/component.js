import Component from '@ember/component';
import layout from './template';
import { maybeInvokeAction } from 'dummy/util/action';

export default Component.extend({
  classNameBindings: [ ':ui-block-author-edit' ],
  layout,

  author: null,

  actions: {
    async save() {
      // temporary
      let author = this.get('author');
      await author.save();
      maybeInvokeAction(this, 'saved', author);
    },
    async cancel() {
      // temporary
      let author = this.get('author');
      await author.reload();
      maybeInvokeAction(this, 'cancelled', author);
    }
  }

});
