import { computed } from '@ember/object';

const property = key => computed(function() {
  let internal = this._internal;
  return internal && internal[key];
});

export const database = () => property('database');
export const store = () => property('store');
export const stores = () => property('stores');
