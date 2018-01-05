import { next as _next, later as _later } from '@ember/runloop';
import { resolve, Promise } from 'rsvp';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import SequentialQueue from 'ember-cli-models/-private/util/operation/sequential-queue';
import Operation from 'ember-cli-models/-private/util/operation/operation';

const next = () => new Promise(resolve => _next(() => resolve()));
const later = delay => new Promise(resolve => _later(() => resolve(), delay));

class FunctionOperation extends Operation {
  constructor(fn, info) {
    super();
    this.fn = fn;
    this.info = info;
  }
  perform() {
    return resolve(this.fn());
  }
}

module('sequential-queue', {
  beforeEach() {
    this.queue = new SequentialQueue();
    this.fn = (fn, info) => new FunctionOperation(fn, info);
  }
});

test('run first success', async function(assert) {
  let queue = this.queue;
  let op = this.fn(() => next().then(() => next()).then(() => 'hey'));

  assert.ok(queue.operation === null);
  assert.ok(queue.operations.length === 0);

  queue.schedule(op);

  assert.ok(queue.operation === null);
  assert.ok(queue.operations.length === 1);

  await next();

  assert.ok(queue.operation === op);
  assert.ok(queue.operations.length === 1);

  await queue.settle();

  assert.ok(queue.operation === null);
  assert.ok(queue.operations.length === 0);

  let result = await op.promise;
  assert.equal(result, 'hey');
});

test('run first reject', async function(assert) {
  let queue = this.queue;
  let op = this.fn(() => next().then(() => next()).then(() => {
    throw new Error('fake');
  }));

  assert.ok(queue.operation === null);
  assert.ok(queue.operations.length === 0);

  queue.schedule(op);

  assert.ok(queue.operation === null);
  assert.ok(queue.operations.length === 1);

  await next();

  assert.ok(queue.operation === op);
  assert.ok(queue.operations.length === 1);

  await queue.settle();

  assert.ok(queue.operation === null);
  assert.ok(queue.operations.length === 0);

  try {
    await op.promise;
    assert.ok(false, 'should throw');
  } catch(err) {
    assert.equal(err.message, 'fake');
  }
});

test('run multiple', async function(assert) {
  let log = [];
  let queue = this.queue;
  let op = (success, message, delay) => this.fn(() => {
    log.push(`start ${message}`);
    return later(delay).then(() => {
      if(success) {
        log.push(`ok ${message}`);
        return success;
      } else {
        log.push(`err ${message}`);
        throw new Error(message);
      }
    });
  });

  queue.schedule(op(false, 'one', 50));
  queue.schedule(op(true, 'two', 30));
  queue.schedule(op(false, 'three', 10));
  queue.schedule(op(true, 'four', 0));

  assert.ok(queue.operations.length === 4);

  await queue.settle();

  assert.ok(queue.operations.length === 0);

  assert.deepEqual(log, [
    "start one",
    "err one",
    "start two",
    "ok two",
    "start three",
    "err three",
    "start four",
    "ok four"
  ]);
});

test('find operation', async function(assert) {
  let queue = this.queue;
  let op = this.fn(() => 'hey', { type: 'load' });

  queue.schedule(op);

  assert.ok(queue.operations.length === 1);

  assert.ok(queue.find(op => op.info.type === 'load') === op);
  assert.ok(queue.find(op => op.info.type === 'foo') === undefined);

  await queue.settle();
});
