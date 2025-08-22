import { DesativadoState } from 'src/domain/states/DesativadoState.js';
import { Sku } from 'src/domain/entities/Sku.js';
import { SkuStates } from 'src/domain/types/StatesEnum.js';
import { describe, expect, it } from 'vitest';

describe('DesativadoState', () => {
  it('should create a DesativadoState instance', () => {
    const sku = new Sku({ id: '1', description: 'desc', comercialDescription: 'comdesc', sku: 'sku1' });
    const state = new DesativadoState(sku);
    expect(state).toBeInstanceOf(DesativadoState);
  });

  it('should return correct name from getName()', () => {
    const sku = new Sku({ id: '2', description: 'desc', comercialDescription: 'comdesc', sku: 'sku2' });
    const state = new DesativadoState(sku);
    expect(state.getName()).toBe(SkuStates.Desativado);
  });

  it('should allow transition to Ativo and PreCadastro', () => {
    const sku = new Sku({ id: '3', description: 'desc', comercialDescription: 'comdesc', sku: 'sku3' });
    const state = new DesativadoState(sku);
    expect(() => state.transitionTo(SkuStates.Ativo)).not.toThrow();
    expect(() => state.transitionTo(SkuStates.PreCadastro)).not.toThrow();
  });

  it('should throw error for disallowed transition', () => {
    const sku = new Sku({ id: '4', description: 'desc', comercialDescription: 'comdesc', sku: 'sku4' });
    const state = new DesativadoState(sku);
    expect(() => state.transitionTo(SkuStates.CadastroCompleto)).toThrow();
    expect(() => state.transitionTo(SkuStates.Cancelado)).toThrow();
  });

  it('should throw error when editing comercialDescription', () => {
    const sku = new Sku({ id: '5', description: 'desc', comercialDescription: 'comdesc', sku: 'sku5' });
    const state = new DesativadoState(sku);
    expect(() => state.editComercialDescription('newdesc')).toThrow('Nao é possivel atualizar o SKU no atual fluxo');
  });

  it('should throw error when editing description', () => {
    const sku = new Sku({ id: '6', description: 'desc', comercialDescription: 'comdesc', sku: 'sku6' });
    const state = new DesativadoState(sku);
    expect(() => state.editDescription('newdesc')).toThrow('Nao é possivel atualizar o SKU no atual fluxo');
  });

  it('should throw error when editing sku', () => {
    const sku = new Sku({ id: '7', description: 'desc', comercialDescription: 'comdesc', sku: 'sku7' });
    const state = new DesativadoState(sku);
    expect(() => state.editSku('newsku')).toThrow('Nao é possivel atualizar o SKU no atual fluxo');
  });
});
