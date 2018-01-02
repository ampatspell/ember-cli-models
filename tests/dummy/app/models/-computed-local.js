import { withDatabase } from './-computed-base';

const {
  findByType,
  model
} = withDatabase({ store: 'local', database: 'main' });

export {
  findByType,
  model
};
