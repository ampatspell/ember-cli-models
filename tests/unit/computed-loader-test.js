import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import EmberObject, { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { loader } from 'ember-cli-models/computed';
import { next } from 'ember-cli-models/-private/util/promise';
import ModelsError from 'ember-cli-models/-private/util/error';

module('computed-loader', {
  beforeEach() {
    this.subject = () => {
      this.register('app:subject', EmberObject.extend({
        id: 'duck',
        error: null,
        log: computed(function() {
          return [];
        }),
        loader: loader(function() {
          return {
            recurrent: false,
            owner: [ 'id', 'error' ],
            async perform() {
              let { id, error } = this.getProperties('id', 'error');

              await next();

              if(error) {
                this.get('log').push(`error ${id} ${error}`);
                throw new ModelsError({ error: 'perform', reason: error });
              } else {
                this.get('log').push(`load ${id}`);
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
});

test('autoload and load', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  let one = loader._internal.autoloadForKey('isLoading');
  let two = loader._internal.load();

  assert.ok(one === two);
});

test('load and reload', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  let one = loader._internal.load();
  let two = loader._internal.reload();

  assert.ok(one === two);
});

test('two reloads', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  let one = loader._internal.reload();
  let two = loader._internal.reload();

  assert.ok(one === two);
});

test('load and two reloads', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  let zero = loader._internal.load();
  let one = loader._internal.reload();
  let two = loader._internal.reload();

  assert.ok(zero === one);
  assert.ok(one === two);
});

test('autoload and reload', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  let one = loader._internal.autoloadForKey('isLoading');
  let two = loader._internal.reload();

  assert.ok(one === two);
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

test('load reset load', async function(assert) {
  let subject = this.subject();
  subject.set('id', 'yellow');
  let loader = subject.get('loader');

  assert.equal(loader.get('autoload.isLoading'), true);

  await this.stores.settle();

  subject.set('id', 'green');
  assert.equal(loader.get('autoload.isLoading'), true);

  await this.stores.settle();

  assert.deepEqual(subject.get('log'), [
    "load yellow",
    "load green"
  ]);
});

test('load and reset while loading', async function(assert) {
  let subject = this.subject();
  subject.set('id', 'yellow');
  let loader = subject.get('loader');

  assert.equal(loader.get('autoload.isLoading'), true);

  await next();
  await next();

  subject.set('id', 'green');
  assert.equal(loader.get('autoload.isLoading'), true);

  await next();

  await this.stores.settle();

  assert.deepEqual(subject.get('log'), [
    "load yellow",
    "load green"
  ]);
});

test('autoload and reset while loading are not scheduling two operations', async function(assert) {
  let subject = this.subject();
  subject.set('id', 'yellow');
  let loader = subject.get('loader');

  assert.equal(loader.get('autoload.isLoading'), true);
  assert.equal(loader.get('autoload.isLoading'), true);

  subject.set('id', 'green');

  assert.equal(loader.get('autoload.isLoading'), true);
  assert.equal(loader.get('autoload.isLoading'), true);

  await run(() => this.stores.settle());

  assert.deepEqual(subject.get('log'), [
    "load green"
  ]);
});
