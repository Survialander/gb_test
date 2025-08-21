import { AtivoState } from "../states/AtivoState.js";
import { CadastroCompletoState } from "../states/CadastroCompleto.js";
import { CanceladoState } from "../states/CanceladoState.js";
import { DesativadoState } from "../states/DesativadoState.js";
import { PreCadastroState } from "../states/PreCadastroState.js";
import { SkuState } from "../states/SkuState.js";
import { SkuStates } from "../types/StatesEnum.js";

export type SkuProps = {
  id?: string;
  description: string;
  comercialDescription: string;
  sku: string;
  state?: string;
};

export class Sku {
  public id?: string;
  public description: string;
  public comercialDescription: string;
  public sku: string;
  private state: SkuState;

  constructor(props: SkuProps) {
    this.id = props.id;
    this.description = props.description;
    this.comercialDescription = props.comercialDescription;
    this.sku = props.sku;
    this.state = this.createState(props.state ?? SkuStates.PreCadastro);
  }

  private createState(state: string): SkuState {
    switch (state) {
      case SkuStates.PreCadastro:
        return new PreCadastroState(this);
      case SkuStates.CadastroCompleto:
        return new CadastroCompletoState(this);
      case SkuStates.Ativo:
        return new AtivoState(this);
      case SkuStates.Desativado:
        return new DesativadoState(this);
      case SkuStates.Cancelado:
        return new CanceladoState(this);
      default:
        throw new Error(`Invalid State: ${state}`);
    }
  }

  get stateName(): string {
    return this.state.getName();
  }

  editDescription(data: string) {
    this.state.editDescription(data);
  }

  editComercialDescription(data: string) {
    this.state.editComercialDescription(data);
  }

  editSku(data: string) {
    this.state.editSku(data);
  }

  setState(newState: SkuStates) {
    this.state = this.createState(newState);
  }

  transitionTo(newState: SkuStates) {
    this.state.transitionTo(newState);
  }
}
