import { alias, readOnly } from '@ember/object/computed';

export const attr = key => alias(`storage.${key}`);
