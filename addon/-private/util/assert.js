import ModelsError  from './error';
import Base from './assert-base';

let {
  assert,
  notBlank_,
  notBlank,
  isString_,
  isString,
  isObject_,
  isObject,
  isInstance_,
  isInstance,
  isClass_,
  isClass,
  isFunction_,
  isFunction,
  isArray_,
  isArray,
  isArrayProxy_,
  isArrayProxy,
  isArrayOrArrayProxy_,
  isArrayOrArrayProxy,
  isBoolean_,
  isBoolean,
  isOneOf
} = Base(ModelsError);

export {
  assert,
  notBlank_,
  notBlank,
  isString_,
  isString,
  isObject_,
  isObject,
  isInstance_,
  isInstance,
  isClass_,
  isClass,
  isFunction_,
  isFunction,
  isArray_,
  isArray,
  isArrayProxy_,
  isArrayProxy,
  isArrayOrArrayProxy_,
  isArrayOrArrayProxy,
  isBoolean_,
  isBoolean,
  isOneOf
}

export {
  isDatabase_,
  isDatabase,
  isArrayArrayProxyOrHasIdentity_,
  isArrayArrayProxyOrHasIdentity
} from './assert-additions';

export default assert;
