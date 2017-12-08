import Mixin from '@ember/object/mixin';
import factoryFor from './factory-for';

export const makeContextMixin = Class => Mixin.create({

  init() {
    this._super(...arguments);
    this._context = new Class(this);
  },

  willDestroy() {
    this._super();
    this._context.destroy();
  }

});

export default class Context {

  constructor(owner, parent) {
    this.owner = owner;
    this.parent = parent;
  }

  create(name) {
    return factoryFor(this.owner, name).create({ _context: this });
  }

}
