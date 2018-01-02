import { withDatabase } from './-computed-base';

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
