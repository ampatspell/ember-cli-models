import { assert, isArrayOrArrayProxy_ } from './assert';

import {
  isDatabase as _isDatabase,
  hasIdentity
} from './is-instance';

export const isDatabase_ = (message, arg) => assert(message, _isDatabase(arg));
export const isDatabase = (key, arg) => isDatabase_(`${key} must be database`, arg);

export const isArrayArrayProxyOrHasIdentity_ = (message, arg) => {
  if(hasIdentity(arg)) {
    return;
  }
  isArrayOrArrayProxy_(message, arg);
};

export const isArrayArrayProxyOrHasIdentity = (key, arg) => isArrayArrayProxyOrHasIdentity_(`${key} must be database, store, stores or array`, arg);
