import { APIError } from "../../application/errors/ApiError.js";
import { Sku } from "../entities/Sku.js";
import { SkuStates } from "../types/StatesEnum.js";
import { SkuState } from "./SkuState.js";

export class DesativadoState implements SkuState {
  constructor(private sku: Sku) {}

  getName(): string {
    return SkuStates.Desativado;
  }

  transitionTo(newState: SkuStates): void {
    const allowed = [SkuStates.Ativo, SkuStates.PreCadastro];

    if (!allowed.includes(newState)) {
      throw new APIError(
        `Mudança de fluxo inválida para o SKU:${this.sku.sku}`,
        400,
      );
    }

    this.sku.setState(newState);
  }

  editComercialDescription(_: string): void {
    throw new APIError("Nao é possivel atualizar o SKU no atual fluxo", 400);
  }

  editDescription(_: string): void {
    throw new APIError("Nao é possivel atualizar o SKU no atual fluxo", 400);
  }

  editSku(_: string): void {
    throw new APIError("Nao é possivel atualizar o SKU no atual fluxo", 400);
  }
}
