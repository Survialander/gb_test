import { describe, it, expect } from 'vitest';
import { AtivoState } from '../domain/states/AtivoState.js';
import { Sku } from '../domain/entities/Sku.js';
import { SkuStates } from '../domain/types/StatesEnum.js';
import { APIError } from '../application/errors/ApiError.js';

describe('AtivoState', () => {
  it('should create an AtivoState instance', () => {
    const sku = new Sku({ id: '1', description: 'desc', comercialDescription: 'comdesc', sku: 'sku1' });
    const state = new AtivoState(sku);
    expect(state).toBeInstanceOf(AtivoState);
    expect(state.getName()).toBe(SkuStates.Ativo);
  });

  it('should allow transition to DesativadoState', () => {
    const sku = new Sku({ id: '2', description: 'desc2', comercialDescription: 'comdesc2', sku: 'sku2' });
    const state = new AtivoState(sku);
    expect(() => state.transitionTo(SkuStates.Desativado)).not.toThrow();
    expect(sku.stateName).toBe(SkuStates.Desativado);
  });

  it('should throw error for invalid transition', () => {
    const sku = new Sku({ id: '3', description: 'desc3', comercialDescription: 'comdesc3', sku: 'sku3' });
    const state = new AtivoState(sku);
    expect(() => state.transitionTo(SkuStates.Ativo)).toThrow(APIError);
  });

  it('should throw error on editComercialDescription', () => {
    const sku = new Sku({ id: '4', description: 'desc4', comercialDescription: 'comdesc4', sku: 'sku4' });
    const state = new AtivoState(sku);
    expect(() => state.editComercialDescription('new')).toThrow(APIError);
  });

  it('should throw error on editDescription', () => {
    const sku = new Sku({ id: '5', description: 'desc5', comercialDescription: 'comdesc5', sku: 'sku5' });
    const state = new AtivoState(sku);
    expect(() => state.editDescription('new')).toThrow(APIError);
  });

  it('should throw error on editSku', () => {
    const sku = new Sku({ id: '6', description: 'desc6', comercialDescription: 'comdesc6', sku: 'sku6' });
    const state = new AtivoState(sku);
    expect(() => state.editSku('newsku')).toThrow(APIError);
  });
});
