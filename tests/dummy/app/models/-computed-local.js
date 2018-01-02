import { withDatabase } from './-computed';

const {
  findByType,
  filterByType,
  model,
  prop
} = withDatabase({ store: 'local', database: 'main' });

export {
  findByType,
  filterByType,
  model,
  prop
};
