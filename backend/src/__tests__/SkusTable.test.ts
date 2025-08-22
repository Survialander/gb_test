import { skusTable } from 'src/infra/database/dbSchema.js';
import { describe, expect, it } from 'vitest';

describe('SkusTable', () => {
  it('should export expected table', () => {
    expect(skusTable).toBeDefined();
  });
});
