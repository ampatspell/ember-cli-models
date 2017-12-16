import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { database } from 'ember-cli-models/computed';

export default Component.extend({
  classNameBindings: [ ':ui-route-authors-new' ],
  layout,

  database: database('remote', 'main'),

  // temporary
  author: computed(function() {
    return this.get('database').model('author', { name: 'Unnamed' });
  }).readOnly(),

  // temporary
  willDestroyElement() {
    this._super(...arguments);
    let author = this.get('author');
    if(!author.get('isNew')) {
      return;
    }
    author.destroy();
  },

  actions: {
    async save() {
      await this.get('author').save();
      this.get('router').transitionTo('authors');
    },
    async cancel() {
      // TODO: rollback
      this.get('router').transitionTo('authors');
    }
  }

});
