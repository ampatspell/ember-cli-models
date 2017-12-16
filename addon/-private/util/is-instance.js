import Database from '../database';

export const isDatabase = arg => Database.detectInstance(arg);
