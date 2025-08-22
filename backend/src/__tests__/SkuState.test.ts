import { describe, it, expect } from 'vitest';
import { SkuState } from '../domain/states/SkuState.js';
import { SkuStates } from '../domain/types/StatesEnum.js';

class TestState extends SkuState {
  getName() { return SkuStates.Ativo; }
  transitionTo(newState) { return; }
  editDescription(data) { return; }
  editComercialDescription(data) { return; }
  editSku(data) { return; }
}

describe('SkuState abstract class', () => {
  it('should allow subclassing and method calls', () => {
    const state = new TestState();
    expect(state.getName()).toBe(SkuStates.Ativo);
    expect(() => state.transitionTo(SkuStates.Desativado)).not.toThrow();
    expect(() => state.editDescription('desc')).not.toThrow();
    expect(() => state.editComercialDescription('comdesc')).not.toThrow();
    expect(() => state.editSku('sku')).not.toThrow();
  });
});
