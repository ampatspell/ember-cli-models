import { assert } from './assert';

import {
  isDatabase as _isDatabase
} from './is-instance';

export const isDatabase_ = (message, arg) => assert(message, _isDatabase(arg));
export const isDatabase = (key, arg) => isDatabase_(`${key} must be database`, arg);
