import Mixin from '@ember/object/mixin';

export default Class => Mixin.create({

  init() {
    this._super(...arguments);
    this._context = new Class(this);
  },

  willDestroy() {
    this._super();
    this._context.destroy();
  }

});
