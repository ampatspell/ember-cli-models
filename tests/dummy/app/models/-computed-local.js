import { withDatabase } from './-computed';

const {
  prop,
  findByType,
  filterByType,
  model
} = withDatabase({ store: 'local', database: 'main' });

export {
  prop,
  findByType,
  filterByType,
  model
};
