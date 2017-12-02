import { dasherize } from '@ember/string';
import { notBlank } from './assert';

export default identifier => {
  notBlank('identifier', identifier);
  return dasherize(identifier.trim());
};
