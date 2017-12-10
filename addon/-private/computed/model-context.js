import { computed } from '@ember/object';

const withInternal = cb => computed(function() {
  let internal = this._internal;
  if(!internal) {
    return;
  }
  return cb(internal);
});

export const database = identifier => withInternal(internal => {
  if(identifier) {
    return internal.store.database(identifier);
  }
  return internal.database;
});

export const store = identifier => withInternal(internal => {
  if(identifier) {
    return internal.stores.store(identifier);
  }
  return internal.store;
});

export const stores = () => withInternal(internal => {
  return internal.stores;
});
