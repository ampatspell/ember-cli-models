import { run } from '@ember/runloop';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model from 'ember-cli-models/model/transient';
import { database, find } from 'ember-cli-models/computed';
import FilterFirst from 'ember-cli-models/-private/model/filter-first';

const Duck = Model.extend({
  type: 'duck'
});

const Hamster = Model.extend({
  type: 'hamster'
});

module('computed-find', {
  beforeEach() {
    this.register('model:duck', Duck);
    this.register('model:hamster', Hamster);
    this.subject = () => {

      let config = function() {
        return  {
          source: this.get('database'),
          owner: [ 'modelType' ],
          model: [ 'type' ],
          matches(model, owner) {
            return model.get('type') === owner.get('modelType');
          }
        };
      };

      this.register('model:state', Model.extend({
        database: database(),
        modelType: 'duck',
        duck: find('database', config)
      }));

      return this.database.model('state');
    };
  }
});

test('state exists', function(assert) {
  let state = this.subject();
  assert.ok(state);
  assert.ok(state.get('database'));
  let one = this.database.model('duck', { id: 'one' });
  let identity = this.database.get('identity');
  assert.ok(identity.includes(one));
});

test('find exists', function(assert) {
  let state = this.subject();
  let duck = state.get('duck');
  assert.ok(duck);
  assert.ok(FilterFirst.detectInstance(duck));

  let internal = duck._internal;
  assert.ok(internal);
  assert.ok(internal._model === duck);

  run(() => duck.destroy());

  assert.ok(internal.isDestroyed);
  assert.ok(!internal._model);
});

test('find contains pre-existing first model', function(assert) {
  this.database.model('hamster', { id: 'cute' });
  this.database.model('duck', { id: 'yellow' });
  this.database.model('duck', { id: 'green' });

  let state = this.subject();
  let duck = state.get('duck');
  assert.equal(duck.get('id'), 'yellow');
});

test('find keeps first model', function(assert) {
  this.database.model('hamster', { id: 'cute' });
  this.database.model('duck', { id: 'yellow' });

  let state = this.subject();
  let duck = state.get('duck');
  assert.equal(duck.get('id'), 'yellow');

  this.database.model('duck', { id: 'green' });
  assert.equal(duck.get('id'), 'yellow');
});

test('find content is set on new model', function(assert) {
  let state = this.subject();
  let duck = state.get('duck');
  assert.equal(duck.get('id'), undefined);

  this.database.model('hamster', { id: 'cute' });
  assert.equal(duck.get('id'), undefined);

  this.database.model('duck', { id: 'green' });
  assert.equal(duck.get('id'), 'green');
});

test('find content is unset on model destroy', function(assert) {
  let state = this.subject();
  let duck = state.get('duck');
  assert.equal(duck.get('id'), undefined);

  let model = this.database.model('duck', { id: 'green' });
  assert.equal(duck.get('id'), 'green');

  run(() => model.destroy());

  assert.equal(duck.get('id'), undefined);
});

test('find content is unset on model prop change', function(assert) {
  let state = this.subject();
  let duck = state.get('duck');
  assert.equal(duck.get('id'), undefined);

  let model = this.database.model('duck', { id: 'green' });
  assert.equal(duck.get('id'), 'green');

  model.set('type', 'hamster');
  assert.equal(duck.get('id'), undefined);
});

test('find content is replaced with another model on current prop change', function(assert) {
  let state = this.subject();
  let duck = state.get('duck');
  assert.equal(duck.get('id'), undefined);

  let yellow = this.database.model('duck', { id: 'yellow' });
  this.database.model('duck', { id: 'green' });
  assert.equal(duck.get('id'), 'yellow');

  yellow.set('type', 'hamster');

  assert.equal(duck.get('id'), 'green');
});

test('find content is replaced with another model on owner prop change', function(assert) {
  let state = this.subject();
  let duck = state.get('duck');
  assert.equal(duck.get('id'), undefined);

  this.database.model('hamster', { id: 'cute' });
  this.database.model('duck', { id: 'green' });
  assert.equal(duck.get('id'), 'green');

  state.set('modelType', 'hamster');
  assert.equal(duck.get('id'), 'cute');
});

test('find content is removed on owner prop change', function(assert) {
  let state = this.subject();
  let duck = state.get('duck');
  assert.equal(duck.get('id'), undefined);

  this.database.model('hamster', { id: 'cute' });
  this.database.model('duck', { id: 'green' });
  assert.equal(duck.get('id'), 'green');

  state.set('modelType', 'foobar');
  assert.equal(duck.get('id'), undefined);
});

test('find content is replaced with another model on owner prop change', function(assert) {
  let state = this.subject();
  let prop = state.get('duck');
  assert.equal(prop.get('id'), undefined);

  this.database.model('hamster', { id: 'cute' });
  let duck = this.database.model('duck', { id: 'green' });
  assert.equal(prop.get('id'), 'green');

  state.set('modelType', 'hamster');
  assert.equal(prop.get('id'), 'cute');

  duck.set('type', 'random');
  assert.equal(prop.get('id'), 'cute');

  state.set('modelType', 'random');
  assert.equal(prop.get('id'), 'green');
});
