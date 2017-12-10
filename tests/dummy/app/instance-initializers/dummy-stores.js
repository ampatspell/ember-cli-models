import Stores from '../stack/stores';

export default {
  name: 'dummy:stores',
  initialize(app) {
    app.register('models:stores', Stores);
  }
}
