import Component from '@ember/component';
import layout from './template';
import { maybeInvokeAction } from 'dummy/util/action';

export default Component.extend({
  classNameBindings: [ ':ui-block-div', 'action:has-action' ],
  layout,

  click() {
    maybeInvokeAction(this, 'action');
  }

});
