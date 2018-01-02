import { withDatabase } from './-computed-base';

const {
  findByType,
  model
} = withDatabase({ store: 'remote', database: 'main' });

export {
  findByType,
  model
};
