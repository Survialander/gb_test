import { APIError } from "../../../application/errors/ApiError.js";
import { Sku } from "../../../domain/entities/Sku.js";
import { db as database } from "../index.js";
import { skusTable } from "../tables/SkusTable.js";
import { count, desc, eq } from "drizzle-orm";

export interface ISkuRepository {
  create(data: Sku): Promise<void>;
  update(data: Sku): Promise<void>;
  findById(id: string): Promise<Sku | undefined>;
  findAll(data: {
    page: number;
    limit: number;
  }): Promise<{ data: Sku[]; hasMore: boolean }>;
  findBySku(sku: string): Promise<Sku | undefined>;
}

export class SkuRepository implements ISkuRepository {
  constructor(private readonly db = database) {}

  private entityToSkuObject(data: any) {
    const { id, description, comercialDescription, sku, state } = data;

    const skuObject = new Sku({ id, description, comercialDescription, sku });
    skuObject.setState(state);

    return skuObject;
  }

  public async findBySku(sku: string): Promise<Sku | undefined> {
    const [result] = await this.db
      .select()
      .from(skusTable)
      .where(eq(skusTable.sku, sku));

    if (!result) {
      return undefined;
    }

    return this.entityToSkuObject(result);
  }

  public async create(data: Sku): Promise<void> {
    await this.db.insert(skusTable).values({
      comercialDescription: data.comercialDescription,
      description: data.description,
      sku: data.sku,
      state: data.stateName,
    });
  }

  public async update(data: Sku): Promise<void> {
    const sku = await this.db
      .select()
      .from(skusTable)
      .where(eq(skusTable.id, data.id));

    if (!sku) {
      throw new APIError("SKU inválido", 400);
    }

    await this.db
      .update(skusTable)
      .set({
        comercialDescription: data.comercialDescription,
        description: data.description,
        sku: data.sku,
        state: data.stateName,
      })
      .where(eq(skusTable.id, data.id));
  }

  public async findById(id: string): Promise<Sku | undefined> {
    const [sku] = await this.db
      .select()
      .from(skusTable)
      .where(eq(skusTable.id, id));

    if (!sku) {
      return undefined;
    }

    return this.entityToSkuObject(sku);
  }

  public async findAll(data: { page: number; limit: number }) {
    const { limit, page } = data;
    const [counter] = await this.db
      .select({ count: count(skusTable.id) })
      .from(skusTable);
    const skus = await this.db.query.skusTable.findMany({
      orderBy: (sku, { desc }) => [desc(sku.createdAt)],
      offset: limit * (page - 1),
      limit,
    });
    const pages = Math.ceil(counter.count / limit);
    return {
      data: skus.map((sku) => this.entityToSkuObject(sku)),
      hasMore: page < pages,
    };
  }
}
