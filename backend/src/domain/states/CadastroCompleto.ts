import { APIError } from "../../application/errors/ApiError.js";
import { Sku } from "../entities/Sku.js";
import { SkuStates } from "../types/StatesEnum.js";
import { SkuState } from "./SkuState.js";

export class CadastroCompletoState implements SkuState {
  constructor(private sku: Sku) {}

  getName(): string {
    return SkuStates.CadastroCompleto;
  }

  canEditField(field: string): boolean {
    return ["comercialDescription"].includes(field);
  }

  transitionTo(newState: SkuStates): void {
    const allowed = [
      SkuStates.PreCadastro,
      SkuStates.Ativo,
      SkuStates.Cancelado,
    ];

    if (!allowed.includes(newState)) {
      throw new APIError(
        `Mudança de fluxo inválida para o SKU:${this.sku.sku}`,
        400,
      );
    }

    this.sku.setState(newState);
  }

  editComercialDescription(data: string): void {
    this.sku.transitionTo(SkuStates.PreCadastro);
    this.sku.comercialDescription = data;
  }

  editDescription(_: string): void {
    throw new APIError("Não é possível alterar o campo Descrição", 400);
  }

  editSku(_: string): void {
    throw new APIError("Não é possível alterar o campo SKU", 400);
  }
}
