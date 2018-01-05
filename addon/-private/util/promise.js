import { next as _next } from '@ember/runloop';
import { Promise } from 'rsvp';

const noop = () => {};

export const next = () => new Promise(resolve => _next(resolve));
export const settle = promise => promise.catch(noop);
