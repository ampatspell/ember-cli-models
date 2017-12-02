import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

const withStores = fn => computed(function() {
  return fn(getOwner(this).lookup('models:stores'));
});

const stores = () => withStores(stores => stores);

const store = identifier => withStores(stores => stores.store(identifier));

const database = (storeIdentifier, databaseIdentifier) => {
  return withStores(stores => stores.store(storeIdentifier).database(databaseIdentifier));
};

export {
  stores,
  store,
  database
};
