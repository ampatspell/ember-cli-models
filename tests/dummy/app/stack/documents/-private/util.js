import { readOnly } from '@ember/object/computed';

const prefix = 'adapter.documents';

export const property = key => readOnly(`${prefix}.${key}`);

export const forward = key => function(...args) {
  let target = this.get(prefix);
  return target[key].call(target, ...args);
};
