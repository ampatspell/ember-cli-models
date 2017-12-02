import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import layout from './template';

const type = value => equal('_type', value).readOnly();

export default Component.extend({
  classNameBindings: [ ':ui-application' ],
  layout,

  type: null,

  _type: computed('type', function() {
    return this.get('type') || 'default';
  }).readOnly(),

  isDefault: type('default'),
  isEmpty: type('empty'),

});
