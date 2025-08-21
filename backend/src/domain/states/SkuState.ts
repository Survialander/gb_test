import { SkuStates } from "../types/StatesEnum.js";

export abstract class SkuState {
  abstract getName(): string;
  abstract transitionTo(newState: SkuStates): void;
  abstract editDescription(data: string): void;
  abstract editComercialDescription(data: string): void;
  abstract editSku(data: string): void;
}
