
import { describe, expect, it } from 'vitest';
import { db } from '../infra/database/index.js';
const dbIndex = db;

describe('dbIndex', () => {
  it('should export expected database index', () => {
    expect(dbIndex).toBeDefined();
  });
});
