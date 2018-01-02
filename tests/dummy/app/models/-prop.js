import { get } from '@ember/object';

class Property {
}

class StringProperty extends Property {
  constructor(value) {
    super();
    this.value = value;
  }

  getKey() {
  }

  getValue() {
    return this.value;
  }

}

class OwnerProperty extends Property {
  constructor(key) {
    super();
    this.key = key;
  }

  getKey() {
    return this.key;
  }

  getValue(object) {
    return get(object, this.key);
  }

}

export const prop = key => new OwnerProperty(key);

export const getKey = arg => {
  if(arg instanceof Property) {
    return arg.getKey();
  }
}

export const getValue = (arg, object) => {
  if(arg instanceof Property) {
    return arg.getValue(object);
  }
  return arg;
}
