import { withDatabase } from './-computed-base';

const {
  findByType,
  filterByType,
  model,
  prop
} = withDatabase({ store: 'remote', database: 'main' });

export {
  findByType,
  filterByType,
  model,
  prop
};
