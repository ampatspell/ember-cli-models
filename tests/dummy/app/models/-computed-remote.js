import { withDatabase } from './-computed-base';

const {
  findByType,
  filterByType,
  model
} = withDatabase({ store: 'remote', database: 'main' });

export {
  findByType,
  filterByType,
  model
};
