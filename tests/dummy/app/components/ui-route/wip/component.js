import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { database } from 'ember-cli-models/computed';

class Internal {
  constructor(property) {
    this.property = property;
    this._content = 'one';
    console.log('create internal');
  }

  set content(value) {
    this._content = value;
    let { object, key } = this.property;
    object.notifyPropertyChange(key);
  }

  get content() {
    console.log('get content');
    return this._content;
  }
}

export default Component.extend({
  classNameBindings: [ ':ui-route-wip' ],
  layout,

  database: database('remote', 'main'),
  id: 'one',

  model: computed('database', function(key) {
    let internalKey = `_${key}`;
    let internal = this[internalKey];
    if(!internal) {
      internal = new Internal({ object: this, key });
      this[internalKey] = internal;
    }
    return internal.content;
  }),

  didInsertElement() {
    this._super(...arguments);
    console.log(`window.component = ${this}`);
    window.component = this;
  }

});
