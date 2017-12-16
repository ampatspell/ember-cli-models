import Mixin from '@ember/object/mixin';
import { info } from 'ember-cli-models/-private/util/logger';

export default Mixin.create({

  init() {
    this._super(...arguments);
    info('init', this+'');
  },

  willDestroy() {
    this._super(...arguments);
    info('willDestroy', this+'');
  }

});
