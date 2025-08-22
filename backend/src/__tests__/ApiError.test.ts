import { APIError } from 'src/application/errors/ApiError.js';
import { describe, expect, it } from 'vitest';

describe('ApiError', () => {
  it('should create an APIError instance', () => {
    const error = new APIError('Test error', 400);
    expect(error).toBeInstanceOf(APIError);
    expect(error.message).toBe('Test error');
    expect(error.status).toBe(400);
  });
});
