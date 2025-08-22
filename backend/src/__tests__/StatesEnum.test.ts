import { SkuStates } from 'src/domain/types/StatesEnum.js';
import { describe, expect, it } from 'vitest';

describe('StatesEnum', () => {
  it('should contain expected enum values', () => {
    expect(SkuStates).toBeDefined();
    expect(SkuStates.PreCadastro).toBe('PRE-CADASTRO');
    expect(SkuStates.CadastroCompleto).toBe('CADASTRO-COMPLETO');
    expect(SkuStates.Ativo).toBe('ATIVO');
    expect(SkuStates.Desativado).toBe('DESATIVADO');
    expect(SkuStates.Cancelado).toBe('CANCELADO');
  });
});
