import Component from '@ember/component';
import layout from './template';
import { readOnly } from '@ember/object/computed';
import { stores } from 'ember-cli-models/computed';
import { info } from 'ember-cli-models/-private/util/logger';

export default Component.extend({
  classNameBindings: [ ':ui-block:', ':identity' ],
  layout,

  stores: stores(),
  models: readOnly('stores.identity'),

  actions: {
    select(model) {
      window.model = model;
      info(`window.model = ${model}`);
    }
  }

});
