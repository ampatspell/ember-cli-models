import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';
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

export class Context {

  constructor(owner, parent) {
    this.owner = owner;
    this.parent = parent;
  }

  create(name, props) {
    return factoryFor(this.owner, name).create(assign({}, props, { _context: this }));
  }

}

export const prop = name => computed(function() {
  return this._context[name];
}).readOnly();

export const adapter = () => prop('adapter');
export const identity = () => prop('identity');
