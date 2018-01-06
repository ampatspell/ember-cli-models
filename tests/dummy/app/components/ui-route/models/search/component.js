import Component from '@ember/component';
import layout from './template';
import { loadById, findById, prop } from 'dummy/models/-computed-remote';

export default Component.extend({
  classNameBindings: [ ':ui-route-models-search' ],
  layout,

  id: 'author:ampatspell',

  loader: loadById({ id: prop('id') }),
  model: findById({ id: prop('id') })

});
