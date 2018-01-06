import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import EmberObject from '@ember/object';
import { loader } from 'ember-cli-models/computed';
import { resolve } from 'rsvp';
import { next } from 'ember-cli-models/-private/util/promise';
import ModelsError from 'ember-cli-models/-private/util/error';

module('computed-loader', {
  beforeEach() {
    this.log = [];
    let log = this.log;
    this.subject = () => {
      this.register('app:subject', EmberObject.extend({
        id: 'duck',
        error: null,
        loader: loader(function() {
          return {
            recurrent: false,
            owner: [ 'id', 'error' ],
            async perform() {
              await next();
              await next();

              let { id, error } = this.getProperties('id', 'error');
              if(error) {
                log.push(`error ${id} ${error}`);
                throw new ModelsError({ error: 'perform', reason: error });
              } else {
                log.push(`load ${id}`);
                return { id };
              }
            }
          };
        })
      }));
      return this.lookup('app:subject');
    };
  }
});

test('it exists', function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');
  assert.ok(loader);
});

test('load state', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  assert.deepEqual(loader.get('state'), {
    "error": null,
    "isError": false,
    "isLoadable": true,
    "isLoaded": false,
    "isLoading": false,
    "isMore": false
  });

  let promise = loader.load();

  await next();

  assert.deepEqual(loader.get('state'), {
    "error": null,
    "isError": false,
    "isLoadable": true,
    "isLoaded": false,
    "isLoading": true,
    "isMore": false
  });

  await promise;

  assert.deepEqual(loader.get('state'), {
    "error": null,
    "isError": false,
    "isLoadable": true,
    "isLoaded": true,
    "isLoading": false,
    "isMore": false
  });
});

test('two loads', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  let one = loader._internal.load();
  let two = loader._internal.load();

  assert.ok(one === two);

  await one;
  await two;
});

test('autoload and load', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  let one = loader._internal.autoloadForKey('isLoading');
  let two = loader._internal.load();

  assert.ok(one === two);

  await one;
  await two;
});

test('load and reload', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  let one = loader._internal.load();
  let two = loader._internal.reload();

  assert.ok(one === two);

  await one;
  await two;
});

test('two reloads', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  let one = loader._internal.reload();
  let two = loader._internal.reload();

  assert.ok(one === two);

  await one;
  await two;
});

test('load and two reloads', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  let zero = loader._internal.load();
  let one = loader._internal.reload();
  let two = loader._internal.reload();

  assert.ok(zero === one);
  assert.ok(one === two);

  await zero;
  await one;
  await two;
});

test('autoload and reload', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  let one = loader._internal.autoloadForKey('isLoading');
  let two = loader._internal.reload();

  assert.ok(one === two);

  await one;
  await two;
});

test('loader.autoload', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  assert.equal(loader.get('autoload.isLoading'), true);

  await this.stores.settle();

  assert.equal(loader.get('autoload.isLoading'), false);
});

test('loader.autoload does not load after error', async function(assert) {
  let subject = this.subject();
  subject.set('error', 'not found');
  let loader = subject.get('loader');

  assert.equal(loader.get('autoload.isLoading'), true);

  await this.stores.settle();

  assert.deepEqual(loader.get('error').toJSON(), {
    "error": "perform",
    "reason": "not found"
  });

  assert.equal(loader.get('autoload.isLoading'), false);
});
