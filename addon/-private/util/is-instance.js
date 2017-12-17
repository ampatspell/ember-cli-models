import Database from '../database';
import Store from '../store';
import Stores from '../stores';

export const isDatabase = arg => Database.detectInstance(arg);
export const isStore = arg => Store.detectInstance(arg);
export const isStores = arg => Stores.detectInstance(arg);

export const hasIdentity = arg => isDatabase(arg) || isStore(arg) || isStores(arg);
