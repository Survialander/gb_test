import { Sku } from 'src/domain/entities/Sku.js';
import { CadastroCompletoState } from 'src/domain/states/CadastroCompleto.js';
import { SkuStates } from 'src/domain/types/StatesEnum.js';
import { describe, expect, it } from 'vitest';


describe('CadastroCompletoState', () => {
	it('should create a CadastroCompletoState instance', () => {
		const sku = new Sku({
			id: '1',
			description: 'desc',
			comercialDescription: 'comdesc',
			sku: 'sku1',
		});
		const state = new CadastroCompletoState(sku);
		expect(state).toBeInstanceOf(CadastroCompletoState);
	});

	it('should allow transition to allowed states', () => {
		const sku = new Sku({ id: '2', description: 'desc', comercialDescription: 'comdesc', sku: 'sku2' });
		const state = new CadastroCompletoState(sku);
		expect(() => state.transitionTo(SkuStates.PreCadastro)).not.toThrow();
		expect(() => state.transitionTo(SkuStates.Ativo)).not.toThrow();
		expect(() => state.transitionTo(SkuStates.Cancelado)).not.toThrow();
	});

	it('should throw error for disallowed transition', () => {
		const sku = new Sku({ id: '3', description: 'desc', comercialDescription: 'comdesc', sku: 'sku3' });
		const state = new CadastroCompletoState(sku);
		expect(() => state.transitionTo(SkuStates.Desativado)).toThrow();
	});

	it('should edit comercialDescription and transition to PRE-CADASTRO', () => {
		const sku = new Sku({ id: '4', description: 'desc', comercialDescription: 'comdesc', sku: 'sku4' });
		sku.setState(SkuStates.CadastroCompleto);
		sku.editComercialDescription('newdesc');
		expect(sku.comercialDescription).toBe('newdesc');
		expect(sku.stateName).toBe(SkuStates.PreCadastro);
	});

	it('should return correct name from getName()', () => {
		const sku = new Sku({ id: '10', description: 'desc', comercialDescription: 'comdesc', sku: 'sku10' });
		const state = new CadastroCompletoState(sku);
		expect(state.getName()).toBe(SkuStates.CadastroCompleto);
	});

	it('should throw error with correct message when editing description', () => {
		const sku = new Sku({ id: '5', description: 'desc', comercialDescription: 'comdesc', sku: 'sku5' });
		const state = new CadastroCompletoState(sku);
		expect(() => state.editDescription('newdesc')).toThrow("Não é possível alterar o campo Descrição");
	});


	it('should throw error with correct message when editing sku', () => {
		const sku = new Sku({ id: '6', description: 'desc', comercialDescription: 'comdesc', sku: 'sku6' });
		const state = new CadastroCompletoState(sku);
		expect(() => state.editSku('newsku')).toThrow("Não é possível alterar o campo SKU");
	});
});
