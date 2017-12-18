import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';

export const prop = name => computed(function() {
  return this._internal && this._internal[name];
});

export const BaseMixin = Mixin.create({

  _internal: null,

  willDestroy() {
    this._internal.modelWillDestroy(this);
    this._super();
  }

});
