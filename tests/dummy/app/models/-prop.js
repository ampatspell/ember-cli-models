import { get } from '@ember/object';

class Property {
  constructor(key) {
    this.key = key;
  }

  getKey() {
    return this.key;
  }

  getValue(object) {
    return get(object, this.key);
  }

}

export const prop = key => new Property(key);

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
