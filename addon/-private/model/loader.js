import EmberObject, { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
import { resolve } from 'rsvp';
import { BaseMixin } from './base';
import { keys } from './internal/loader-state';

const state = key => computed(function() {
  return this._internal && this._internal.getStateProperty(key, false);
}).readOnly();

const toJSON = () => computed(...keys, function() {
  return this._internal && this._internal.state.toJSON();
}).readOnly();

const StateMixin = Mixin.create(keys.reduce((props, key) => {
  props[key] = state(key);
  return props;
}, {
  state: toJSON()
}));

const autoload = () => computed(function() {
  return this._internal.autoload(true);
}).readOnly();

const promise = name => function() {
  let internal = this._internal;
  return resolve(internal[name].call(internal, ...arguments)).then(() => this);
};

export default EmberObject.extend(BaseMixin, StateMixin, {

  autoload: autoload(),

  load:     promise('load'),
  reload:   promise('reload'),
  loadMore: promise('loadMore')

});
