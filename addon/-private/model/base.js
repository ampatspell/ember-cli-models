import Mixin from '@ember/object/mixin';

export const BaseMixin = Mixin.create({

  _internal: null,

  willDestroy() {
    this._internal.modelWillDestroy(this);
    this._super();
  }

});
