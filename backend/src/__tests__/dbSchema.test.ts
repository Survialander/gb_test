
import { describe, expect, it } from 'vitest';
import * as dbSchema from '../infra/database/dbSchema.js';

describe('dbSchema', () => {
  it('should export expected schema', () => {
    expect(dbSchema).toBeDefined();
  });
});
