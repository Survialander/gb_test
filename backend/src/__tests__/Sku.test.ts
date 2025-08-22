import { describe, it, expect } from 'vitest';
import { Sku } from '../domain/entities/Sku.js';
import { SkuStates } from '../domain/types/StatesEnum.js';

describe('Sku', () => {
  it('should create a Sku instance', () => {
    const sku = new Sku({
      id: '1',
      description: 'desc',
      comercialDescription: 'comdesc',
      sku: 'sku1',
    });
    expect(sku).toBeInstanceOf(Sku);
    expect(sku.id).toBe('1');
    expect(sku.description).toBe('desc');
    expect(sku.comercialDescription).toBe('comdesc');
    expect(sku.sku).toBe('sku1');
    expect(sku.stateName).toBe(SkuStates.PreCadastro);
  });

  it('should set and get state correctly', () => {
    const sku = new Sku({
      id: '2',
      description: 'desc2',
      comercialDescription: 'comdesc2',
      sku: 'sku2',
    });
    sku.setState(SkuStates.Ativo);
    expect(sku.stateName).toBe(SkuStates.Ativo);
    sku.setState(SkuStates.Desativado);
    expect(sku.stateName).toBe(SkuStates.Desativado);
  });

  it('should transition between states', () => {
    const sku = new Sku({
      id: '3',
      description: 'desc3',
      comercialDescription: 'comdesc3',
      sku: 'sku3',
    });
    sku.transitionTo(SkuStates.CadastroCompleto);
    expect(sku.stateName).toBe(SkuStates.CadastroCompleto);
    sku.transitionTo(SkuStates.Ativo);
    expect(sku.stateName).toBe(SkuStates.Ativo);
    sku.transitionTo(SkuStates.Desativado);
    expect(sku.stateName).toBe(SkuStates.Desativado);
  });

  it('should edit description and comercialDescription', () => {
    const sku = new Sku({
      id: '4',
      description: 'desc4',
      comercialDescription: 'comdesc4',
      sku: 'sku4',
    });
    sku.editDescription('newdesc');
    expect(sku.description).toBe('newdesc');
    sku.editComercialDescription('newcomdesc');
    expect(sku.comercialDescription).toBe('newcomdesc');
  });

  it('should throw error for invalid state', () => {
    expect(() => {
      new Sku({
        id: '5',
        description: 'desc5',
        comercialDescription: 'comdesc5',
        sku: 'sku5',
        state: 'INVALID',
      });
    }).toThrow();
  });
});
