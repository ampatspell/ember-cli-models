import { computed } from '@ember/object';
import lookupStores from '../util/lookup-stores';

const withStores = fn => computed(function() {
  return fn(lookupStores(this));
});

export const stores = () => withStores(stores => stores);

export const store = identifier => withStores(stores => stores.store(identifier));

export const database = (storeIdentifier, databaseIdentifier) => {
  return withStores(stores => stores.database(storeIdentifier, databaseIdentifier));
};
