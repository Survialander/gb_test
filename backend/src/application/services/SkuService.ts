import { Sku } from "../../domain/entities/Sku.js";
import { SkuStates } from "../../domain/types/StatesEnum.js";
import {
  ISkuRepository,
  SkuRepository,
} from "../../infra/database/repositories/SkuRepository.js";
import { APIError } from "../errors/ApiError.js";

type UpdateSkuDTO = {
  id: string;
  description?: string;
  comercialDescription?: string;
  sku?: string;
};

type CreateSkuDTO = {
  description: string;
  comercialDescription: string;
  sku: string;
};

export class SkuService {
  constructor(
    private readonly skuRepository: ISkuRepository = new SkuRepository(),
  ) {}

  public findById(id: string) {
    return this.skuRepository.findById(id);
  }

  public async findAll(page: number, limit: number) {
    return this.skuRepository.findAll({ limit, page });
  }

  public async create(data: CreateSkuDTO) {
    const { comercialDescription, description, sku: skuCode } = data;

    const exists = await this.skuRepository.findBySku(skuCode);

    if (exists) {
      throw new APIError(
        `Já existe um SKU cadastrado com o código '${skuCode}'.`,
        400,
      );
    }

    const skuObject = new Sku({
      description,
      comercialDescription,
      sku: skuCode,
    });

    await this.skuRepository.create(skuObject);
  }

  public async update(data: UpdateSkuDTO) {
    const { id, comercialDescription, description, sku: skuCode } = data;

    const skuObject = await this.skuRepository.findById(id);

    if (!skuObject) {
      throw new APIError(`SKU: ${id} not found`, 404);
    }

    if (description) {
      skuObject.editDescription(description);
    }

    if (comercialDescription) {
      skuObject.editComercialDescription(comercialDescription);
    }

    if (skuCode) {
      skuObject.editSku(skuCode);
    }

    await this.skuRepository.update(skuObject);

    return skuObject;
  }

  public async changeState(id: string, state: SkuStates) {
    const skuObject = await this.skuRepository.findById(id);

    if (!skuObject) {
      throw new APIError(`SKU: ${id} not found`, 404);
    }

    skuObject.transitionTo(state);

    await this.skuRepository.update(skuObject);

    return skuObject;
  }
}
