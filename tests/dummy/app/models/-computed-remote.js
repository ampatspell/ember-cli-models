import { withDatabase } from './-computed';

const {
  prop,
  findByType,
  filterByType,
  model,
  hasManyPersisted,
  manyToManyInverse
} = withDatabase({ store: 'remote', database: 'main' });

export {
  prop,
  findByType,
  filterByType,
  model,
  hasManyPersisted,
  manyToManyInverse
};
