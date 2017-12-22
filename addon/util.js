import lookupStores from './-private/util/lookup-stores';

export {
  lookupStores as getStores
};

export const getStore = (owner, identifier) => {
  return lookupStores(owner).store(identifier);
};

export const getDatabase = (owner, storeIdentifier, databaseIdentifier) => {
  return lookupStores(owner).database(storeIdentifier, databaseIdentifier);
};
