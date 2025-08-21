import { APIError } from "../../application/errors/ApiError.js";
import { Sku } from "../entities/Sku.js";
import { SkuStates } from "../types/StatesEnum.js";
import { SkuState } from "./SkuState.js";

export class CanceladoState implements SkuState {
  constructor(private sku: Sku) {}

  getName(): string {
    return SkuStates.Cancelado;
  }

  transitionTo(_: SkuStates): void {
    throw new APIError("SKU cancelado. Não é possível alterá-lo", 400);
  }

  editComercialDescription(_: string): void {
    throw new APIError("SKU cancelado. Não é possível alterá-lo", 400);
  }

  editDescription(_: string): void {
    throw new APIError("SKU cancelado. Não é possível alterá-lo", 400);
  }

  editSku(_: string): void {
    throw new APIError("SKU cancelado. Não é possível alterá-lo", 400);
  }
}
