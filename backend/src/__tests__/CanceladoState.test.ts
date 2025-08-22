import { Sku } from 'src/domain/entities/Sku.js';
import { CanceladoState } from 'src/domain/states/CanceladoState.js';
import { SkuStates } from 'src/domain/types/StatesEnum.js';
import { describe, expect, it } from 'vitest';

describe('CanceladoState', () => {
  it('should create a CanceladoState instance', () => {
    const sku = new Sku({ id: '1', description: 'desc', comercialDescription: 'comdesc', sku: 'sku1' });
    const state = new CanceladoState(sku);
    expect(state).toBeInstanceOf(CanceladoState);
  });

  it('should throw error on transitionTo', () => {
    const sku = new Sku({ id: '2', description: 'desc', comercialDescription: 'comdesc', sku: 'sku2' });
    const state = new CanceladoState(sku);
  expect(() => state.transitionTo(SkuStates.Ativo)).toThrow();
  });

  it('should throw error on editComercialDescription', () => {
    const sku = new Sku({ id: '3', description: 'desc', comercialDescription: 'comdesc', sku: 'sku3' });
    const state = new CanceladoState(sku);
    expect(() => state.editComercialDescription('newdesc')).toThrow();
  });

  it('should throw error on editDescription', () => {
    const sku = new Sku({ id: '4', description: 'desc', comercialDescription: 'comdesc', sku: 'sku4' });
    const state = new CanceladoState(sku);
    expect(() => state.editDescription('newdesc')).toThrow();
  });

  it('should throw error on editSku', () => {
    const sku = new Sku({ id: '5', description: 'desc', comercialDescription: 'comdesc', sku: 'sku5' });
    const state = new CanceladoState(sku);
    expect(() => state.editSku('newsku')).toThrow();
  });
});
