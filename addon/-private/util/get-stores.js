import { getOwner } from '@ember/application';

export const getStores = owner => getOwner(owner).lookup('models:stores');
export const getStore = (owner, store) => getStores(owner).store(store);
export const getDatabase = (owner, store, database) => getStores(owner).database(store, database);
