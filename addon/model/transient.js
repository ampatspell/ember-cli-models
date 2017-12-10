export { default } from '../-private/model/transient-model';
import { computed } from '@ember/object';

export const database = () => computed(function() {
  let internal = this._internal;
  return internal && internal.database;
});
