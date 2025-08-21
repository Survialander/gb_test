import { APIError } from "../../application/errors/ApiError.js";
import { Sku } from "../entities/Sku.js";
import { SkuStates } from "../types/StatesEnum.js";
import { SkuState } from "./SkuState.js";

export class PreCadastroState implements SkuState {
  constructor(private sku: Sku) {}

  getName(): string {
    return SkuStates.PreCadastro;
  }

  transitionTo(newState: SkuStates): void {
    const allowed = [SkuStates.CadastroCompleto, SkuStates.Cancelado];

    if (!allowed.includes(newState)) {
      throw new APIError(
        `Mudança de fluxo inválida para o SKU:${this.sku.sku}`,
        400,
      );
    }

    this.sku.setState(newState);
  }

  editDescription(data: string): void {
    this.sku.description = data;
  }

  editComercialDescription(data: string): void {
    this.sku.comercialDescription = data;
  }

  editSku(data: string): void {
    this.sku.sku = data;
  }
}
