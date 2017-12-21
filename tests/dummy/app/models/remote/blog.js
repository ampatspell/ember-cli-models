import Model, { attr, fallback } from './model';

export default Model.extend({

  id: attr('id'),
  name: attr('name'),

  screenName: fallback('name', 'Unnamed'),

});
