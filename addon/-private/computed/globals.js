import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

const withStores = fn => computed(function() {
  return fn(getOwner(this).lookup('models:stores'));
});

export const stores = () => withStores(stores => stores);

export const store = identifier => withStores(stores => stores.store(identifier));

export const database = (storeIdentifier, databaseIdentifier) => {
  return withStores(stores => stores.store(storeIdentifier).database(databaseIdentifier));
};
