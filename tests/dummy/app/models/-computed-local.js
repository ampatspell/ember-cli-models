import { withDatabase } from './-computed-base';

const {
  findByType,
  filterByType,
  model
} = withDatabase({ store: 'local', database: 'main' });

export {
  findByType,
  filterByType,
  model
};
