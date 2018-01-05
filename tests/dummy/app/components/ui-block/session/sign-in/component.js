import Component from '@ember/component';
import layout from './template';
import { state } from 'dummy/models/state';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: [ ':ui-block-session-sign-in' ],
  layout,

  state: state(),
  session: readOnly('state.session'),

});
