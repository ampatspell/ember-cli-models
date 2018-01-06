import { withDatabase } from './-computed';

const {
  prop,
  findByType,
  findById,
  filterByType,
  model,
  hasManyPersisted,
  manyToManyInverse,
  view,
  loadById
} = withDatabase({ store: 'remote', database: 'main' });

export {
  prop,
  findByType,
  findById,
  filterByType,
  model,
  hasManyPersisted,
  manyToManyInverse,
  view,
  loadById
};
