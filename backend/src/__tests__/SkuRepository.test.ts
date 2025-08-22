import { describe, it, expect, beforeEach, vi } from "vitest";
import { SkuRepository } from "../infra/database/repositories/SkuRepository.js";
import { Sku } from "../domain/entities/Sku.js";
import { SkuStates } from "../domain/types/StatesEnum.js";

const mockDb = {
  insert: vi.fn().mockReturnThis(),
  values: vi.fn().mockResolvedValue(undefined),
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  query: {
    skusTable: {
      findMany: vi.fn().mockResolvedValue([]),
    },
  },
};

mockDb.select.mockReturnValue(mockDb);
mockDb.from.mockReturnValue(mockDb);
mockDb.where.mockReturnValue(mockDb);

const mockSkuData = {
  id: "1",
  description: "desc",
  comercialDescription: "comdesc",
  sku: "sku1",
  state: SkuStates.Ativo,
};

function setupSelectChain(returnValue: any) {
  mockDb.select.mockReturnValue({
    from: () => ({
      where: () => Promise.resolve(returnValue),
    }),
  });
}

describe("SkuRepository", () => {
  it("should create a sku", async () => {
    const repo = new SkuRepository(mockDb as any);
    const sku = new Sku(mockSkuData);
    await repo.create(sku);
    expect(mockDb.insert).toHaveBeenCalled();
    expect(mockDb.values).toHaveBeenCalled();
  });

  it("should update a sku", async () => {
    setupSelectChain([mockSkuData]);
    const repo = new SkuRepository(mockDb as any);
    const sku = new Sku(mockSkuData);
    await repo.update(sku);
    expect(mockDb.update).toHaveBeenCalled();
    expect(mockDb.set).toHaveBeenCalled();
  });

  it("should throw error if sku not found on update", async () => {
    mockDb.select.mockReturnValue({
      from: () => ({
        where: () => Promise.resolve(undefined),
      }),
    });
    const repo = new SkuRepository(mockDb as any);
    const sku = new Sku(mockSkuData);
    await expect(repo.update(sku)).rejects.toThrow();
  });

  it("should find sku by id", async () => {
    setupSelectChain([mockSkuData]);
    const repo = new SkuRepository(mockDb as any);
    const result = await repo.findById("1");
    expect(result).toBeInstanceOf(Sku);
    expect(result?.sku).toBe("sku1");
  });

  it("should return undefined if sku not found by id", async () => {
    setupSelectChain([]);
    const repo = new SkuRepository(mockDb as any);
    const result = await repo.findById("2");
    expect(result).toBeUndefined();
  });

  it("should find all skus", async () => {
    mockDb.select.mockReturnValue({
      from: () => Promise.resolve([{ count: 1 }]),
    });
    mockDb.query.skusTable.findMany.mockResolvedValue([mockSkuData]);
    const repo = new SkuRepository(mockDb as any);
    const result = await repo.findAll({ page: 1, limit: 1 });
    expect(result.data[0]).toBeInstanceOf(Sku);
    expect(result.hasMore).toBe(false);
  });
});
