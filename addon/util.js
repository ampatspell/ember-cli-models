import lookupStores from './-private/util/lookup-stores';

export const stores = owner => lookupStores(owner);

export const store = (owner, identifier) => lookupStores(owner).store(identifier);

export const database = (owner, storeIdentifier, databaseIdentifier) => lookupStores(owner).database(storeIdentifier, databaseIdentifier);
